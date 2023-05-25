import { useContext } from "react";

import QuestionContext from "../context/Pregunta/QuestionContext";

import VideoCard from "./VideoCard";

import Grid from "@mui/material/Grid";

export default function ListVideoCard() {
  const { questions } = useContext(QuestionContext);
  // console.log({ questions });
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {questions.map((question) => (
        <Grid key={`question-${question.id}`} item xs={3}>
          <VideoCard question={question.pregunta}></VideoCard>
        </Grid>
      ))}
    </Grid>
  );
}
