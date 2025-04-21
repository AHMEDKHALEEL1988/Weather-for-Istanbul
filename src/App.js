import "./App.css";
import "./Style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "moment/min/locales";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
moment.locale("tr");
let canceAxios = null;
function App() {
  const [Temp, setTemp] = useState(null);
  const [minTemp, setminTemp] = useState(null);
  const [maxTemp, setmxTemp] = useState(null);
  const [description, setDescription] = useState(null);
  const [icon, setIcon] = useState(null);
  const [date_time, setDate_time] = useState(null);
  useEffect(() => {
    setDate_time(moment().format(" ddd D-MM-YYYY"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=41.015137&lon=28.979530&appid=dbf34eb5383842e0e342a3bec293fbd1",
        {
          cancelToken: new axios.CancelToken((c) => {
            canceAxios = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        setminTemp(Math.floor(response.data.main.temp_min - 272.15));
        setmxTemp(Math.ceil(response.data.main.temp_max - 272.15));
        setTemp(Math.round(response.data.main.temp - 275.15));
        setDescription(response.data.weather[0].description);

        setIcon(
          `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      console.log("canceling...");
      canceAxios();
    };
  }, []);
  return (
    <div className="App">
      <Container maxWidth="sm">
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="card">
            <div className="card-header">
              <Typography variant="h3" marginLeft={"5px"}>
                İSTANBUL
              </Typography>
              <Typography variant="h5" marginLeft={"10px"}>
                {date_time}
              </Typography>
            </div>
            <div>
              <hr className="rounded-hr" />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div className="card-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h1"
                    marginLeft={"5px"}
                    textAlign={"left"}
                  >
                    {Temp}
                    {"°"}
                  </Typography>
                  {<img src={icon} alt="" />}
                </div>

                <Typography
                  variant="h6"
                  marginLeft={"5px"}
                  textAlign={"left"}
                  textTransform={"capitalize"}
                >
                  {description}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <h5> Max degree: {maxTemp}</h5>|
                  <h5> Min degree: {minTemp}</h5>
                </div>
              </div>
              <div className="card-body">
                <CloudIcon style={{ fontSize: "200px" }} color="white" />
              </div>
            </div>
          </div>
          <Button
            variant="text"
            style={{
              width: "90%",
              textTransform: "capitalize",
              marginTop: "10px",
              display: "flex",
              justifyContent: "start",
            }}
          >
            Designed by Ahmed Khaleel
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default App;
