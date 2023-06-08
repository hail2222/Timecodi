import React, { useState, useEffect, useLocation } from "react";
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

export function FriendTimetable() {
  const [oo, setOO] = useState(false);
  const history = useHistory();

  let location = useLocation();
  let currentPath = location.pathname;
  let fid = parseInt(currentPath.split("/").pop(), 10);
  console.log("fid", fid);

  axios
    .get("https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/login", {
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

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white mr-2">
            <i className="mdi mdi-timetable"></i>
          </span>{" "}
          {fid} ~~FRIEND NAME~~'s Schedule{" "}
        </h3>
      </div>

      <div className="row">
        <div className="col-lg- ">
          <div className="card" style={{ "margin-left": "1.2vw" }}>
            <div className="card-body d-flex">
              <div style={{ "text-align": "right" }}>
                <p style={{ color: "gray" }}>
                  &nbsp; &nbsp; &nbsp; &nbsp; ** You can only see schedules that
                  are set "public" **&nbsp; &nbsp;&nbsp; &nbsp;
                </p>
                <div>
                  <Main
                    style={{ flexDirection: "column", "margin-top": "20vw" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendTimetable;
