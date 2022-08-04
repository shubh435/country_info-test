import React from "react";
import "./App.css";
import { TextField, Button } from "@mui/material";
import Countres from "./Components/Countres";
import { Container } from "@mui/system";
function App() {
  const [country, setCountry] = React.useState<string>("");
  const [hasDisabled, setHasDisabled] = React.useState(true);
  const [countries, setCountries] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleCountryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCountry(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetch(`https://restcountries.com/v2/name/${country}`)
      .then((resp) => resp.json())
      .then((data: any) => {
        setCountries(data);

        setCountry("");
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

  if (loading) return <p>loading...</p>;
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
      <Container sx={{ m: "10% auto auto  auto" }}>
        <Countres countries={countries} />
      </Container>
    </div>
  );
}

export default App;
