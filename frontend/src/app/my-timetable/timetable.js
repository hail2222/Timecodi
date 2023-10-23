import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Form, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// import "react-datepicker/dist/react-datepicker.css";
//달력 추가
// import GlobalStyle from "./styles/GlobalStyle";
// import { ThemeProvider } from "styled-components";
// import Theme from "./styles/Theme";
import Main from "./Main";
import axios from "axios";
import url from "./../apiurl";

export function Dashboard() {
  const [oo, setOO] = useState(false);
  const history = useHistory();

  axios
    .get(url + "/login", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      if (response.data.success == true) {
        // alert("good");
      }
    })
    .catch((err) => {
      setOO(true);
    });

  useEffect(() => {
    if (oo) {
      history.push("/user-pages/login-1");
      // alert("please login");
    }
  }, [oo]);
  // handleChange = date => {
  //   this.setState({
  //     startDate: date
  //   });
  // };
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     startDate: new Date(),
  //     visitSaleData: {},

  //   }
  // }
  const [name, setName] = useState("");
  const [visible, setVisible] = useState("");
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const [enddate, setEnddate] = useState("");

  const handleAddEvent = () => {
    const data = {
      cname: name,
      visibility: visible,
      sdatetime: sdate,
      edatetime: edate,
      weekly: 0,
      enddate: enddate.split("T")[0],
    };
    axios
      .post(url + "/event", data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        alert("add event failed");
      });
  };

  const [repeatOption, setRepeatOption] = useState("none");
  const handleShowRepeat = (e) => {
    setRepeatOption(e.target.value);
  };

  const handleGoogleCalendar = () => {
    console.log("google calendar clicked");
    axios
      .post(
        `${url}/google`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white mr-2">
            <i className="mdi mdi-timetable"></i>
          </span>{" "}
          User Schedule{" "}
        </h3>
      </div>

      <div className="row">
        <div className="col-lg-12 ">
          <div className="card">
            <div className="card-body p-0 d-flex">
              <div>
                <Main style={{ flexDirection: "column" }} />
              </div>
              <div className="col-sm-7 col-md-5 col-lg-4 stretch-card">
                <div className="card ">
                  {/* <h3 className="card-title">Add Event</h3> */}
                  <br></br>
                  <br></br>
                  <center>
                    <h2>Add Event</h2>
                  </center>
                  <br></br>
                  <br></br>
                  {/* <p className="card-description"> Enter your schedule. </p> */}
                  <label>Event Name: </label>
                  <Form.Control
                    type="text"
                    id="event_content"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>{" "}
                  <br></br>
                  <label>Visibility:</label>
                  <select
                    className="form-control"
                    id="event_visibility"
                    value={visible}
                    onChange={(e) => setVisible(e.target.value)}
                  >
                    <option value="default">default</option>
                    <option value="public">public</option>
                    <option value="private">private</option>
                  </select>{" "}
                  <br></br>
                  <label>Start Date: </label>
                  <Form.Control
                    type="datetime-local"
                    id="event_sdue"
                    value={sdate}
                    onChange={(e) => setSdate(e.target.value)}
                  ></Form.Control>{" "}
                  <br></br>
                  <label>End Date:</label>
                  <Form.Control
                    type="datetime-local"
                    id="event_edue"
                    value={edate}
                    onChange={(e) => {
                      setEdate(e.target.value);
                      setEnddate(e.target.value);
                    }}
                  ></Form.Control>{" "}
                  <br></br>
                  <label>Repeat:</label>
                  <select
                    className="form-control"
                    id="event_repeat"
                    value={repeatOption}
                    onChange={handleShowRepeat}
                  >
                    <option value="none">none</option>
                    <option value="daily">daily</option>
                    <option value="weekly">weekly</option>
                    <option value="monthly">monthly</option>
                  </select>
                  <br></br>
                  {repeatOption !== "none" && (
                    <div>
                      <label>Repeat End Date: </label>
                      <Form.Control
                        type="date"
                        id="event_done"
                        value={enddate}
                        onChange={(e) => setEnddate(e.target.value)}
                      ></Form.Control>
                    </div>
                  )}
                  <br></br>
                  <br></br>
                  <center>
                    <button
                      type="button"
                      className="btn btn-gradient-primary mr-2"
                      id="event_submit"
                      onClick={handleAddEvent}
                    >
                      Submit
                    </button>
                    <button className="btn btn-light">Cancel</button>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p className="card-description">
                      {" "}
                      or <br></br> Fetch schedule via Google Calendar{" "}
                    </p>

                    <button
                      type="button"
                      className="btn btn-gradient-danger btn-fw"
                      onClick={handleGoogleCalendar}
                    >
                      <i className="mdi mdi-upload btn-icon-prepend"></i>
                      {/* <i className="mdi mdi-google"></i> */}
                      &nbsp;Upload Google Calendar
                    </button>
                  </center>
                  <br></br>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
