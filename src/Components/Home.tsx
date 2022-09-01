import React from "react";
import { TextField, Button, CircularProgress, Box } from "@mui/material";
import Countries from "./Countries";
import { Container } from "@mui/system";
import axios from "axios";
import { CountriesType } from "../interfaces";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [country, setCountry] = React.useState<string>("");
  const [hasDisabled, setHasDisabled] = React.useState<boolean>(true);
  const [countries, setCountries] = React.useState<CountriesType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const navigate = useNavigate();
  const handleCountryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCountry(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetch(`https://restcountries.com/v2/name/${country}`)
      .then((res) => {
        if (res.status === 200) {
          setError("");
          return res.json();
        } else {
          setError("Not Found");
          setLoading(false);
          return;
        }
      })
      .then((data: CountriesType[]) => {
        console.log(data);
        setCountries(data);
        navigate("/countries", { state: data });
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  };
  React.useEffect(() => {
    if (country) {
      setHasDisabled(false);
    } else {
      setHasDisabled(true);
    }
  }, [country]);

  return (
    <div className="App">
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10%",
          marginTop: "5%",
        }}
      >
        <TextField
          id="country"
          label="Enter country name"
          variant="outlined"
          value={country}
          onChange={handleCountryChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="success"
          disabled={hasDisabled}
        >
          Search
        </Button>
      </form>
      {error && <p>{JSON.stringify(error)}</p>}
      {/* {loading ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Container sx={{ m: "10% auto auto  auto" }}>
          <Countries countries={countries} />
        </Container>
      )} */}
    </div>
  );
};

export default Home;
