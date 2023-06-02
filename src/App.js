import "./App.css";
import Appbar from "./components/AppBar";
import BusyDays from "./components/BusyDays";
import MainInfo from "./components/MainInfo";

function App() {
  return (
    <div className="App">
      <Appbar />
      <MainInfo />
      <BusyDays />
    </div>
  );
}

export default App;
