import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar/NavBar";
import Graph from "./components/Graph";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/graph" component={<Graph />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
