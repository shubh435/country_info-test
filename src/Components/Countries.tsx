import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { CountriesType } from "../interfaces";
import Temperture from "./Temperture";
import ErrorBoundary from '../Errors/ErrorBoundary'
// interface Props {
//   countries?: CountriesType[];
// }

interface WeatherData {
 current: {temperature:number,wind_speed:number,precip:number,weather_icons:[]},
 location:{
  name:string
 },

 
}

interface LocationType{

  state: CountriesType[];
 
}

const Countries: React.FC= () => {
  const [weatherData, setWeatherData] = React.useState<WeatherData[]>([]);
  const [capitalNames, setcapitalName] = React.useState<string[]>([]);
  const location = useLocation()

  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false)
  const {state} = location as LocationType
  const handleWeatherOfCapital = (capitalName: string) => {
    setcapitalName([...capitalNames,capitalName]);
    fetch(
      `http://api.weatherstack.com/current?access_key=c02a783b96602e7e7f017644d7c704c2&query=${capitalName}`
    )
      .then((res) => res.json())
      .then((data:WeatherData) => {
        setIsButtonVisible(true)
        // const data = {...data.current,{capitalName:capitalName}}
        setWeatherData([...weatherData,data]);
        console.log(data, weatherData);
      });
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {state &&
          state.map((country:CountriesType, i: number) => {
            const { name, capital, population, latlng,flag } = country;
            return (
              <Card sx={{ width: "20rem" }} key={i}>
                <CardMedia
                  component="img"
                  height="140"
                  image={flag}
                  alt={name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Capital = {capital}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Population = {population}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    latlng = {JSON.stringify(latlng)}
                  </Typography>

                 
                </CardContent>
<ErrorBoundary>

                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                   {weatherData  && (<>
                   
                    {
                      weatherData.map((weather:WeatherData )=>{
                        if(weather.location.name === capital){

                          return (
                            <Box sx={{display:"grid" , justifyContent:"center", gap:"10px", alignItems:"center"}}>
                            <Typography gutterBottom variant="h5" component="div">
                              temperature = {weather.current.temperature}
                            </Typography>
      
                            {weather.current.weather_icons.map(
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
                              wind_speed = {weather.current.wind_speed}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              precip = {weather.current.precip}
                            </Typography>
                          </Box>
                          )
                        }
                      })
                    }
                   </>
                  )}
        { !isButtonVisible && <Button
                    color="success"
                    onClick={() => {handleWeatherOfCapital(capital)}}
                  >
                    Capital Weather
                  </Button>}
             
                </CardActions>
</ErrorBoundary>
              </Card>
            );
          })}
      </Box>
    </Container>
  );
};

export default Countries;
