import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Paper, Button } from "@mui/material";

// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export default function MainInfo() {
  const paperStyle = { padding: "20px 20px", width: 600, margin: "20px auto" };
  const textFieldStyle = { margin: "5px auto" };
  const [startdate, setStartDate] = React.useState("");
  const [scope, setScope] = React.useState("");
  const [deadline, setDeadline] = React.useState("");

  const [answerList, setAnswerList] = React.useState([]);

  const handleClickSubmit = (e) => {
    e.preventDefault();
    const maininfo = { startdate, scope, deadline };

    fetch("http://localhost:8070/busyDate/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(maininfo),
    }).then(() => {
      console.log("Main info was sent - ", { maininfo });
    });
  };

  React.useEffect(() => {
    fetch("http://localhost:8070/busyDate/concl")
      .then((res) => res.json())
      .then((result) => {
        setAnswerList(result);
      })}
    );

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
        <h2>Add main info</h2>
        <TextField
          id="outlined-basic"
          label="Starting date (YYYY-MM-DD)"
          variant="outlined"
          fullWidth
          style={textFieldStyle}
          value={startdate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Working scope (Hours)"
          variant="outlined"
          fullWidth
          style={textFieldStyle}
          value={scope}
          onChange={(e) => setScope(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Deadline (YYYY-MM-DD)"
          variant="outlined"
          fullWidth
          style={textFieldStyle}
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Basic date picker"
              value={startdate}
              onChange={(e) => setStartDate(e.target.value)}
              format="YYYY-MM-DD"
            />
          </DemoContainer>
        </LocalizationProvider> */}
        <Button variant="outlined" onClick={handleClickSubmit}>
          Submit
        </Button>
        <br />
        <h2> Info to You</h2>
       
        {answerList.answer}
        <br />
        <br />
        You will need {answerList.hoursPerDay} hours per day !!!

      </Paper>
    </Box>
  );
}
