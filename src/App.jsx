import "./App.css";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import ListVideoCard from "./components/ListVideoCard";

function App() {
  return (
    <Container sx={{ mt: 10 }}>
      <Grid container>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 10 }}
        >
          <Typography variant="h1" sx={{ fontSize: 50 }}>
            Video Cuestionario
          </Typography>
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
        <Grid display={"flex"} justifyContent={"flex-end"} item xs={12}>
          <Button
            variant="contained"
            size="large"
            sx={{ p: 1.5, pl: 5, pr: 5 }}
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
