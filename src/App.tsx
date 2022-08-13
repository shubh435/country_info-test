import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Temperture from "./Components/Temperture";
import Countries from "./Components/Countries";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/capitalName/:capitalName" element={<Temperture />} />
      </Routes>
    </Router>
  );
}

export default App;
