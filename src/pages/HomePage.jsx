import { useState, useContext } from "react";

import { Link } from "react-router-dom";

import ListVideoCard from "../components/ListVideoCard";
import QuestionContext from "../context/Pregunta/QuestionContext";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const handleClose = () => setOpen(false);

  const { questions } = useContext(QuestionContext);

  const _handleAnswersSubmit = () => {
    setOpen(true);
    setIsCompleted(true);
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
        {isCompleted ? (
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 5, color: "SeaGreen" }}
          >
            <Typography variant="h1" sx={{ fontSize: 50 }}>
              Respuestas envíadas
            </Typography>
          </Grid>
        ) : (
          ""
        )}
        <Grid
          display={"flex"}
          justifyContent={"flex-start"}
          item
          xs={12}
          sx={{ mb: 2 }}
        >
          <Link to="/add-question">
            <Button variant="contained" size="medium">
              Agregar pregunta
            </Button>
          </Link>
        </Grid>
        <Grid
          display={"flex"}
          justifyContent={"center"}
          xs={12}
          sx={{ mb: 10 }}
          item
        >
          <ListVideoCard></ListVideoCard>
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
                ¡Felicidades! Se enviarón sus respuestas con éxito
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
          <Box>
            <Typography variant="h1" sx={{ fontSize: 20 }}>
              Progreso:
              {questions.reduce((accumulator, currentValue) => {
                if (currentValue.video) {
                  return accumulator + 1;
                }
                return accumulator;
              }, 0)}
              /{questions.length}
            </Typography>
            <Typography variant="h1" sx={{ fontSize: 20 }}>
              {questions.reduce((accumulator, currentValue) => {
                if (currentValue.video) {
                  return accumulator + 1;
                }
                return accumulator;
              }, 0) === questions.length
                ? "Preguntas Completas"
                : "Completa las preguntas para enviar."}
            </Typography>
          </Box>
          <Button
            onClick={_handleAnswersSubmit}
            variant="contained"
            size="large"
            sx={{ p: 1.5, pl: 5, pr: 5 }}
            disabled={!questions.every((el) => el.video)}
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
