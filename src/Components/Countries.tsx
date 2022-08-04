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
import Temperture from "./Temperture";
interface Props {
  countries: any[];
}
const Countries: React.FC<Props> = ({ countries }) => {
  const [weatherData, setWeatherData] = React.useState<any>();
  const [capitalName, setcapitalName] = React.useState();
  const handleWeatherOfCapital = (capitalName: any) => {
    setcapitalName(capitalName);
    fetch(
      `http://api.weatherstack.com/current?access_key=c02a783b96602e7e7f017644d7c704c2&query=${capitalName}`
    )
      .then((res) => res.json())
      .then((data: any) => {
        setWeatherData(data.current);
        console.log(data, weatherData);
      });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {countries &&
          countries.map((country, i: number) => {
            const { name, capital, population, latlng, flag } = country;
            return (
              <Card sx={{ width: "20rem" }} key={i}>
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

                  {weatherData && capitalName === capital && (
                    <>
                      <Typography gutterBottom variant="h5" component="div">
                        temperature = {weatherData.temperature}
                      </Typography>

                      {weatherData.weather_icons.map(
                        (icon: string, i: number) => {
                          return (
                            <CardMedia
                              key={i}
                              component="img"
                              height="140"
                              image={icon}
                              alt="green iguana"
                            />
                          );
                        }
                      )}

                      <Typography variant="body2" color="text.secondary">
                        wind_speed = {weatherData.wind_speed}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        precip = {weatherData.precip}
                      </Typography>
                    </>
                  )}
                </CardContent>

                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    color="success"
                    onClick={() => handleWeatherOfCapital(capital)}
                  >
                    Capital Weather
                  </Button>
                </CardActions>
              </Card>
            );
          })}
      </Box>
    </>
  );
};

export default Countries;
