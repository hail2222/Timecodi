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

export function FriendTimetable() {
  const [oo, setOO] = useState(false);
  const history = useHistory();

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

  const handleAddEvent = () => {
    const data = {
      cname: name,
      visibility: visible,
      sdatetime: sdate,
      edatetime: edate,
      weekly: 0,
      enddate: edate.split("T")[0],
    };
    axios
      .post(
        "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/event",
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
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
        "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/google",
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
          ~~FRIEND NAME~~'s Schedule{" "}
        </h3>
      </div>

      <div className="row">
        <div className="col-lg- ">
          <div className="card" style={{"margin-left":"1.2vw"}}>
            <div className="card-body d-flex">
            <div style={{"text-align":"right"}}>
            <p style={{"color":"gray"}}>&nbsp; &nbsp; &nbsp; &nbsp; ** You can only see schedules that are set "public" **&nbsp; &nbsp;&nbsp; &nbsp;</p>
              <div>
                <Main style={{ flexDirection: "column" , "margin-top":"20vw"}} />
              </div>
            
              
              </div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendTimetable;
