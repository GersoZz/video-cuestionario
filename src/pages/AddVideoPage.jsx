import { useContext, useEffect } from "react";

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

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import QuestionContext from "../context/Pregunta/QuestionContext";

export default function AddVideoPage() {
  const { id: videoId } = useParams();
  const { questions } = useContext(QuestionContext);
  const navigate = useNavigate();
  console.log({ videoId });
  console.log({ questions });

  const _handlePrevPage = () => {
    navigate(
      `/add-video/${
        parseInt(videoId) === 0 ? questions.length - 1 : parseInt(videoId) - 1
      }`
    );
  };

  const _handleNextPage = () => {
    navigate(
      `/add-video/${
        parseInt(videoId) === questions.length - 1 ? "0" : parseInt(videoId) + 1
      }`
    );
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
        <Grid
          display={"flex"}
          justifyContent={"center"}
          xs={12}
          sx={{ mb: 10 }}
          item
        >
          <Card sx={{ maxWidth: 700 }}>
            <CardMedia
              component="video"
              autoPlay
              muted
              loop
              controls
              src={null}
              sx={{ minWidth: 200, minHeight: 500, backgroundColor: "black" }}
            />
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
                <IconButton
                  aria-label="play/pause"
                  sx={{
                    backgroundColor: "white",
                    maxHeight: 38,
                    maxWidth: 38,
                  }}
                >
                  <PlayArrowIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid display={"flex"} justifyContent={"space-between"} item xs={12}>
          <Button
            onClick={_handlePrevPage}
            variant="contained"
            size="medium"
            sx={{ p: 1.5, pl: 5, pr: 5 }}
          >
            Anterior
          </Button>
          <Button
            onClick={_handleNextPage}
            variant="contained"
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
