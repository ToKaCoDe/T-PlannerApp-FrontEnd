import * as React from "react";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

export default function BusyDays() {
  const paperStyle = { padding: "20px 20px", width: 600, margin: "20px auto" };
  const [freeDatesList, setFreeDatesList] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8070/freeDate/getFreeAll")
      .then((res) => res.json())
      .then((result) => {
        setFreeDatesList(result);
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
        

        <br/>
        <h3> Yours free time</h3>

        {freeDatesList.map((freeinfo) => (
          <Paper
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
            key={freeinfo.id}
          >
           
            Date: {freeinfo.freedate}
            {" / "}
            Free hours: {freeinfo.freehours}
          </Paper>
        ))}
      </Paper>
    </Box>
  );
}
