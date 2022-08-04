import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
interface Props {
  countries: any[];
}
const Countres: React.FC<Props> = ({ countries }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {countries.map((country) => {
        const { name, capital, population, latlng, flag } = country;
        return (
          <Card sx={{ width: "20rem" }}>
            <CardMedia
              component="img"
              height="140"
              image={flag}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Capitl = {capital}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Population = {population}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                latlng = {JSON.stringify(latlng)}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button color="success">See the weather</Button>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
};

export default Countres;
