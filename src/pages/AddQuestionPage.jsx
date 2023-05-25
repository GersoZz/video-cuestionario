import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box, TextField } from "@mui/material";

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import QuestionContext from "../context/Pregunta/QuestionContext";

export default function AddQuestionPage() {
  const { addQuestion } = useContext(QuestionContext);

  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const questionValidation = (question) => {
    // expresion regular para validar una pregunta
    const regex = /^¿.*\?$/;
    return regex.test(question);
  };

  const _handleSubmit = (e) => {
    e.preventDefault();
    if (!questionValidation(question)) {
      setError({
        error: true,
        message: "Usa los signos ¿?. 😃",
      });
      return;
    }
    console.log(question);
    setError({
      error: false,
      message: "",
    });
    addQuestion(question);
    navigate("/");
  };

  return (
    <Container sx={{ mt: 10 }}>
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
          justifyContent={"flex-start"}
          item
          xs={12}
          sx={{ mb: 2 }}
        >
          <Link to="/">
            <Button variant="contained" size="medium">
              Volver
            </Button>
          </Link>
        </Grid>
        <Grid item display="flex" justifyContent="center" xs={12}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h2" sx={{ fontSize: 25, mb: 2 }}>
              Añade una nueva pregunta
            </Typography>
            <Box component="form" onSubmit={_handleSubmit} autoComplete="off">
              <TextField
                label="Introduce tu pregunta..."
                variant="outlined"
                id="question"
                type="text"
                fullWidth
                required
                error={error.error}
                helperText={error.message}
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
              />
              <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Añadir
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
