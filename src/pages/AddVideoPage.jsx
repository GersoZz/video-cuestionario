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

  const [answer, setAnswer] = useState(questions[parseInt(videoId)]);
  const [isRecorded, setIsRecorded] = useState(false);

  const [isRecording, setIsRecording] = useState(false);

  const [secondsRecording, setSecondsRecording] = useState(0);

  const [timer, setTimer] = useState(null);
  const [timerFormat, setTimerFormat] = useState("0:00");
  const [isRecordIconRed, setIsRecordIconRed] = useState(true);

  const [videoURL, setVideoURL] = useState(null);

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
  };

  const _handleStopRecording = () => {
    console.log(mediaRecorderRef.current);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log("stop");
      clearInterval(timer);
      setIsRecorded(true);
      setSecondsRecording(0);
      setIsRecordIconRed(true);
    }
  };

  useEffect(() => {
    /*     navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);

          mediaRecorderRef.current.addEventListener(
            "dataavailable",
            _handleDataAvailable
          );
      })
      .catch((error) => {
        console.error("No se pudo encontrar la camara: ", error);
      }); */

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
    mediaRecorderRef.current.stop();
    clearInterval(timer);
    setSecondsRecording(0);
    setIsRecordIconRed(true);
    setIsRecorded(false);

    setTimerFormat("00:0");
    navigate(
      `/add-video/${
        parseInt(videoId) === 0 ? questions.length - 1 : parseInt(videoId) - 1
      }`
    );
  };

  const _handleNextPage = () => {
    mediaRecorderRef.current.stop();
    clearInterval(timer);
    setSecondsRecording(0);
    setIsRecordIconRed(true);
    setIsRecorded(false);

    setTimerFormat("00:0");

    navigate(
      `/add-video/${
        parseInt(videoId) === questions.length - 1 ? "0" : parseInt(videoId) + 1
      }`
    );
  };

  const _handleVideoSubmit = () => {
    console.log("answer", answer);

    addAnswer(answer);
    //   navigate("/");
    setOpen(true);
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
        </Grid>
      </Grid>
    </Container>
  );
}
