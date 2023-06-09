import { useContext, useEffect, useState, useRef } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import QuestionContext from "../context/Pregunta/QuestionContext";

import StopIcon from "@mui/icons-material/Stop";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import red from "@mui/material/colors/red";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddVideoPage() {
  const { id: videoId } = useParams();
  const { questions, addAnswer } = useContext(QuestionContext);
  const navigate = useNavigate();
  // console.log({ videoId });
  // console.log({ questions });

  // la respuesta sobre la que se va trabajar
  const [answer, setAnswer] = useState(questions[parseInt(videoId)]);
  // para saber si ya se grabo
  const [isRecorded, setIsRecorded] = useState(false);

  //para saber si se esta grabando
  const [isRecording, setIsRecording] = useState(false);

  // para saber cuantos segundos va grabando
  const [secondsRecording, setSecondsRecording] = useState(0);

  // establece un cronometro con un setInterval
  const [timer, setTimer] = useState(null);
  // para formatear el texto que representa los segundos que se va grabando
  const [timerFormat, setTimerFormat] = useState("0:00");
  // para que el circulo de grabacion se pinte de rojo
  const [isRecordIconRed, setIsRecordIconRed] = useState(true);

  // para poder visualizar lo que se ha grabado
  const [videoURL, setVideoURL] = useState(null);

  // para saber si se completaron todas las preguntas
  const [isCompleted, setIsCompleted] = useState(false);

  const [initializeCamera, setInitializeCamera] = useState(false);

  // para abrir el modal
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const _handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      const blob = new Blob([data], { type: "video/webm" });
      const blobURL = URL.createObjectURL(blob);
      console.log(blobURL);
      setAnswer((prev) => ({
        ...prev,
        video: blobURL,
      }));

      setVideoURL(blobURL);
    }
  };

  const _handlePlayRecording = () => {
    setIsRecorded(false);

    if(!initializeCamera){
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.addEventListener(
          "dataavailable",
          _handleDataAvailable
        );

        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state === "inactive"
        ) {
          mediaRecorderRef.current.start();

          setVideoURL(null);
          setIsRecording(true);

          setTimerFormat("0:00");
          setTimer(
            setInterval(() => {
              setIsRecordIconRed((prev) => !prev);
              setSecondsRecording((prev) => prev + 1);
            }, 1000)
          );
        }
      })
      .catch((error) => {
        console.error("No se pudo encontrar la camara: ", error);
      });

    }else{
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "inactive"
      ) {
        mediaRecorderRef.current.start();

        setVideoURL(null);
        setIsRecording(true);

        setTimerFormat("0:00");
        setTimer(
          setInterval(() => {
            setIsRecordIconRed((prev) => !prev);
            setSecondsRecording((prev) => prev + 1);
          }, 1000)
        );
      }
    }


  };

  const _handleStopRecording = () => {
    console.log(mediaRecorderRef.current);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {

      mediaRecorderRef.current.stop();
      setInitializeCamera(false);
      setIsRecording(false);
      console.log("stop");
      clearInterval(timer);
      setIsRecorded(true);
      setSecondsRecording(0);
      setIsRecordIconRed(true);
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.addEventListener(
          "dataavailable",
          _handleDataAvailable
        );

        setInitializeCamera(true);
      })
      .catch((error) => {
        console.error("No se pudo encontrar la camara: ", error);
      });

    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (secondsRecording !== 0) {
      const minutes = Math.floor(secondsRecording / 60);
      const seconds = secondsRecording % 60;
      const secondsFormatted = seconds < 10 ? "0" + seconds : seconds;

      const secondsRecordingFormatted = `${minutes}:${secondsFormatted}`;
      setTimerFormat(secondsRecordingFormatted);
    }
    if (secondsRecording > 119) {
      _handleStopRecording();
    }
  }, [secondsRecording]);

  useEffect(() => {
    console.log("params", videoId);
    const question = questions[parseInt(videoId)];

    if (question) {
      setAnswer(question);
    }
  }, [videoId, questions]);

  const _handlePrevPage = () => {
    // mediaRecorderRef.current.stop();
    clearInterval(timer);
    setSecondsRecording(0);
    setIsRecordIconRed(true);
    setIsRecorded(false);

    setTimerFormat("00:0");

    // no valido que no haya preguntas sin resolver porque en ese caso el boton siguiente se oculta
    const questionUnresolveds = questions.filter((e) => {
      return !e.video;
    });

    const idsUnresolveds = questionUnresolveds.map((e) => e.id);

    console.log("idsUnresolveds", idsUnresolveds);

    let nextPageUnresolved;

    for (let i = idsUnresolveds.length - 1; i > -1; i--) {
      if (idsUnresolveds[i] < videoId) {
        nextPageUnresolved = idsUnresolveds[i];
        break;
      }
    }

    //significa que hay preguntas sin resolver y que estan adelante
    if (nextPageUnresolved === undefined) {
      nextPageUnresolved = idsUnresolveds[idsUnresolveds.length - 1];
    }

    navigate(`/add-video/${nextPageUnresolved}`);
  };

  const _handleNextPage = () => {
    // mediaRecorderRef.current.stop();
    clearInterval(timer);
    setSecondsRecording(0);
    setIsRecordIconRed(true);
    setIsRecorded(false);

    setTimerFormat("00:0");

    // no valido que no haya preguntas sin resolver porque en ese caso el boton anterior se oculta
    const questionUnresolveds = questions.filter((e) => {
      return !e.video;
    });

    const idsUnresolveds = questionUnresolveds.map((e) => e.id);

    console.log("idsUnresolveds", idsUnresolveds);

    let nextPageUnresolved;

    for (let i = 0; i < idsUnresolveds.length; i++) {
      if (idsUnresolveds[i] > videoId) {
        nextPageUnresolved = idsUnresolveds[i];
        break;
      }
    }

    //significa que hay preguntas sin resolver y que estan atras
    if (nextPageUnresolved === undefined) {
      nextPageUnresolved = idsUnresolveds[0];
    }
    const nextPage =
      parseInt(videoId) === questions.length - 1 ? "0" : parseInt(videoId) + 1;

    navigate(`/add-video/${nextPageUnresolved}`);
  };

  const _handleVideoSubmit = () => {
    console.log("answer", answer);

    addAnswer(answer);
    //   navigate("/");
    setOpen(true);

    const questionUnresolveds = questions.filter((e) => {
      return !e.video;
    });

    const idsUnresolveds = questionUnresolveds.map((e) => e.id);
    console.log(idsUnresolveds); //todos los que no tienen respta xd

    if (idsUnresolveds.length === 1) {
      if (idsUnresolveds.includes(parseInt(videoId))) {
        setIsCompleted(true);
        console.log("completo!");
      }
    }

    if (idsUnresolveds.length === 0) {
      setIsCompleted(true);
      console.log("completo!");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 5 }}
        >
          <Typography variant="h1" sx={{ fontSize: 50 }}>
            Video Cuestionario
          </Typography>
        </Grid>
        <Grid
          display={"flex"}
          justifyContent={"space-between"}
          item
          xs={12}
          sx={{ mb: 2 }}
        >
          <Link to="/">
            <Button variant="contained" size="medium">
              Volver
            </Button>
          </Link>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: 20 }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              Presiona el símbolo de Play para comenzar
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: 20 }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              Recuerda confirmar tu video
            </Typography>
          </Box>
          <Typography
            variant="h6"
            component="div"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {timerFormat}/2:00
            {isRecordIconRed ? (
              <FiberManualRecordIcon sx={{ color: red[500] }} />
            ) : (
              <FiberManualRecordIcon color="disabled" />
            )}
          </Typography>
        </Grid>
        <Grid
          display={"flex"}
          justifyContent={"center"}
          xs={12}
          sx={{ mb: 10 }}
          item
        >
          <Card sx={{ maxWidth: 700 }}>
            {isRecorded ? (
              <CardMedia
                component="video"
                autoPlay
                muted
                loop
                controls
                src={videoURL}
                sx={{ minWidth: 200, minHeight: 500, backgroundColor: "black" }}
              />
            ) : (
              ""
            )}
            {isRecorded ? (
              ""
            ) : (
              <CardMedia
                ref={videoRef}
                component="video"
                autoPlay
                muted
                //   controls
                src={null}
                sx={{ minWidth: 200, minHeight: 500, backgroundColor: "black" }}
              />
            )}
            <CardContent sx={{ backgroundColor: "gray" }}>
              <Box display={"flex"}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    color: "white",
                    flexGrow: 1,
                    fontSize: 20,
                    textAlign: "center",
                    mr: 2,
                  }}
                >
                  {questions[parseInt(videoId)].pregunta}
                </Typography>

                {secondsRecording === 0 ? (
                  <IconButton
                    onClick={_handlePlayRecording}
                    aria-label="play"
                    sx={{
                      backgroundColor: "white",
                      maxHeight: 38,
                      maxWidth: 38,
                    }}
                  >
                    <PlayArrowIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={_handleStopRecording}
                    aria-label="stop"
                    sx={{
                      backgroundColor: "white",
                      maxHeight: 38,
                      maxWidth: 38,
                    }}
                  >
                    <StopIcon />
                  </IconButton>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Se guardó su respuesta con éxito
              </Typography>

              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cerrar
              </Button>
            </Box>
          </Modal>
        </Grid>
        <Grid display={"flex"} justifyContent={"space-between"} item xs={12}>
          {isCompleted ? (
            <>
              {" "}
              <Typography id="modal-modal-title" variant="h6" component="h6">
                Respuestas Completas
              </Typography>
              <Link to="/">
                <Button
                  variant="contained"
                  size="medium"
                  disabled={isRecording}
                  sx={{ p: 1.5, pl: 5, pr: 5 }}
                >
                  Inicio
                </Button>
              </Link>
            </>
          ) : (
            <>
              {" "}
              <Button
                onClick={_handlePrevPage}
                variant="contained"
                size="medium"
                disabled={isRecording}
                sx={{ p: 1.5, pl: 5, pr: 5 }}
              >
                Anterior
              </Button>
              <Button
                onClick={_handleVideoSubmit}
                variant="contained"
                size="medium"
                sx={{ p: 1.5, pl: 5, pr: 5 }}
                disabled={!isRecorded}
              >
                Confirmar Video
              </Button>
              <Button
                onClick={_handleNextPage}
                variant="contained"
                disabled={isRecording}
                size="medium"
                sx={{ p: 1.5, pl: 5, pr: 5 }}
              >
                Siguiente
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
