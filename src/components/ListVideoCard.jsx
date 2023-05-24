import VideoCard from "./VideoCard";
import questions from "../data/questions-mock.js";
import Grid from "@mui/material/Grid";

export default function ListVideoCard() {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {questions.map((question) => (
        <Grid key={`question-${question.id}`} item xs={3}>
          <VideoCard></VideoCard>
        </Grid>
      ))}
    </Grid>
  );
}
