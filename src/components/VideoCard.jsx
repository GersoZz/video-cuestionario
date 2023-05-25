import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function VideoCard({ question, ide, videoSrc }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="video"
        autoPlay
        muted
        loop
        controls
        src={videoSrc}
        sx={{ minWidth: 200, minHeight: 300, backgroundColor: "black" }}
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
            {question}
          </Typography>
          <Link to={`/add-video/${ide}`}>
            <IconButton
              aria-label="play/pause"
              sx={{ backgroundColor: "white", maxHeight: 38, maxWidth: 38 }}
            >
              <PlayArrowIcon />
            </IconButton>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
