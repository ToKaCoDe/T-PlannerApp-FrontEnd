import "./App.css";
import Appbar from "./components/AppBar";
import BusyDays from "./components/BusyDays";
import MainInfo from "./components/MainInfo";
import FreeDays from "./components/FreeDays";

import * as React from "react";

function App() {
  return (
    <div className="App">
      <Appbar />
      <MainInfo />
      <BusyDays />
      <FreeDays />
    </div>
  );
}

export default App;
