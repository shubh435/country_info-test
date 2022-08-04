import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import ErrorBoundary from "../Errors/ErrorBoundary";
// interface Props {
//   weatherData: any;
// }
const styles = {
  backgroundColor: "#fff",
};
const Temperture: React.FC = () => {
  const [weatherData, setWeatherData] = React.useState<any>();
  const params = useParams();

  const handleWeatherOfCapital = (capitalName: any) => {
    console.log(capitalName);
    fetch(
      `http://api.weatherstack.com/current?access_key=39540d9b54928fee5a0ae6e8d5aaf28c&query=${capitalName}`
    )
      .then((res) => res.json())
      .then((data: any) => {
        setWeatherData(data.current);
        console.log(data, weatherData);
      });
  };
  React.useEffect(() => {
    handleWeatherOfCapital(params.capitalName);
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        backgroundColor: "#300",
        width: "30%",

        margin: "10px auto",
      }}
    >

      <ErrorBoundary>
        
      </ErrorBoundary>
   
    </Box>
  );
};

export default Temperture;
