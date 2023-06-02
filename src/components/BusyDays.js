import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Paper, Button } from "@mui/material";

export default function BusyDays() {
  const paperStyle = { padding: "20px 20px", width: 600, margin: "20px auto" };
  const textFieldStyle = { margin: "5px auto" };
  const [busydate, setBusydate] = React.useState("");
  const [busyhours, setBusyhours] = React.useState("");

  const [busyDatesList, setBusyDatesList] = React.useState([]);

  const handleClickAdd = (e) => {
    e.preventDefault();
    const busyinfo = { busydate, busyhours };
    console.log(busyinfo);
    fetch("http://localhost:8070/busyDate/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(busyinfo),
    }).then(() => {
      console.log("Busy date added");
    });
  };

  
  const handleClickClearAll = (e) => {
    e.preventDefault();
    fetch("http://localhost:8070/busyDate/deleteAll", {
      method: "DELETE",
      
    }).then(() => {
      console.log("All data deleted");
    });
  };

  React.useEffect(() => {
    fetch("http://localhost:8070/busyDate/getAll")
      .then((res) => res.json())
      .then((result) => {
        setBusyDatesList(result);
      });
  }, []);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Paper elevation={3} style={paperStyle}>
        <h2>Add busy days</h2>
        <TextField
          id="outlined-basic"
          label="Busy date (YYYY-MM-DD)"
          variant="outlined"
          fullWidth
          style={textFieldStyle}
          value={busydate}
          onChange={(e) => setBusydate(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Busy hours (Hours)"
          variant="outlined"
          fullWidth
          style={textFieldStyle}
          value={busyhours}
          onChange={(e) => setBusyhours(e.target.value)}
        />
        <br/>
        <Button variant="outlined" onClick={handleClickAdd}>
          Add
        </Button>
        <Button variant="outlined" onClick={handleClickClearAll}>
          Clear all
        </Button>

        <br/>
        <h3> Yours busy time</h3>

        {busyDatesList.map((busyinfo) => (
          <Paper
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
            key={busyinfo.id}
          >
           
            Date: {busyinfo.busydate}
            {" / "}
            Hours: {busyinfo.busyhours}
          </Paper>
        ))}
      </Paper>
    </Box>
  );
}
