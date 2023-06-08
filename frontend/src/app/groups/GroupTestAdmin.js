import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Main from "./group-timetable/Main";
import { Form } from "react-bootstrap";
import Timeslot from "./group-timetable/components/Timeslot";
import TimeTable from "./group-timetable/components/Time-table";
import AdminBox from "./group-timetable/components/AdminBox";
import NonAdminBox from "./group-timetable/components/NonAdminBox";
import MemberBox from "./group-timetable/components/MemberBox";

import { Link } from "react-router-dom/cjs/react-router-dom.min";

import GroupCalContext from "./GroupCalContext";
import { Bar, Doughnut } from "react-chartjs-2";
import MapComponent from "./MapComponent";
import axios from "axios";

const realURL = "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app";
const localURL = "https://127.0.0.1:8000";
const url = realURL;

function Group() {
  let location = useLocation();
  let currentPath = location.pathname;
  let gid = parseInt(currentPath.split("/").pop(), 10);
  const [gname, setGname] = useState("");
  const [admin, setAdmin] = useState("");

  const [groupCal, setGroupCal] = useState(null);
  const fetchGroupCal = async () => {
    const data = localStorage.getItem("groupWeeklyCal");
    if (data) {
      setGroupCal(JSON.parse(data));
    }
  };

  let start_date = new Date();
  let end_date = new Date();

  function getStartDate() {
    if (groupCal) {
      const groupCal_dict = groupCal[0];
      const first_list = groupCal_dict["first_list"];
      const first_key = Object.keys(first_list)[0]; // 1st list의 가능한 인원수
      const first_value = first_list[first_key];
      const first_date = first_value[0]; // 1st list의 가능한 날짜
      let dateStr = first_date[0]; // string 형태의 날짜
      let date = new Date(dateStr);
      let dayOfWeek = date.getUTCDay();
      let diffToSun = dayOfWeek;
      let diffToSat = 6 - dayOfWeek;
      let startDate = new Date(date);
      startDate.setDate(date.getDate() - diffToSun);
      let endDate = new Date(date);
      endDate.setDate(date.getDate() + diffToSat);
      start_date = startDate.toISOString().substring(0, 10);
      end_date = endDate.toISOString().substring(0, 10);
    }
    console.log("start_date", start_date);
    console.log("end_date", end_date);
  }

  const getGroupInfo = () => {
    console.log("get group info by gid");
    axios
      .get(`${url}/groupinfo?gid=${gid}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setGname(res.data.gname);
        setAdmin(res.data.admin);
      })
      .catch((err) => {
        console.log("get group info by id");
        console.log(err);
      });
  };
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

  // const { gid } = useParams();

  const [upcoming, setUpComing] = useState({
    name: null,
    when: null,
    where: null,
    memo: null,
  });

  const getUpComing = () => {
    axios
      .get(
        "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/upcoming",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          params: {
            gid: gid,
          },
        }
      )
      .then((response) => {
        if (response.data) {
          let upcomingInfo = {
            name: response.data.title,
            when: response.data.sdatetime,
            where:
              response.data.location + "(" + response.data.loc_detail + ")",
            memo: response.data.memo,
          };
          upcomingInfo.when = upcomingInfo.when.replace("T", " at ");
          setUpComing(upcomingInfo);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getUpComing();
  }, []);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const chartRef = useRef(null);
  const [addShow, setAddShow] = useState(false);
  const addClose = () => setAddShow(!addShow);

  const [addFriend, setFriend] = useState(false);
  const friendClose = () => setFriend(!addFriend);

  const [members, setMembers] = useState([]);

  const getMembers = () => {
    axios
      .get(
        "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/member",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          params: {
            gid: gid,
          },
        }
      )
      .then((response) => {
        let memberList = [];
        response.data.forEach((rel, index) => {
          memberList.push({ id: rel.id, name: rel.name });
        });
        setMembers(memberList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isAdmin, setIsAdmin] = useState(false);

  const getAdmin = () => {
    axios
      .get("https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/admin", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          gid: gid,
        },
      })
      .then((response) => {
        setIsAdmin(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let [options, setOptions] = useState([
    {
      day: "2000-01-01",
      e_time: "23:00:00",
      gid: 1,
      members: 0,
      s_time: "00:00:00",
      vid: 1,
      checked: false,
    },
  ]);
  const getVote = () => {
    axios
      .get(
        "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/votetime",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          params: {
            gid: gid,
          },
        }
      )
      .then((response) => {
        // console.log("Vote: ", response.data);
        let newOptions = response.data;
        // add new key 'checked' to each option and set it to false
        newOptions.forEach((option) => {
          option["checked"] = false;
        });
        setOptions(newOptions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let [result, setResult] = useState([
    {
      vid: 0,
      s_time: "00:00:00",
      e_time: "23:30:00",
      gid: 0,
      day: "2000-01-01",
      members: 2,
    },
  ]);
  const getVoteResult = () => {
    console.log("getVoteResult");
    axios
      .get(
        `https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/voteresult?gid=${gid}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log("Vote Result:", response.data);
        setResult(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [meetingList, setMeetingList] = useState([
    {
      edatetime: "2023-06-04T09:54:21",
      gid: 11,
      loc_detail: "string",
      location: "string",
      meetid: 3,
      memo: "string",
      sdatetime: "2023-06-04T09:54:21",
      title: "sample data",
    },
  ]);
  const getMeetingInfo = () => {
    axios
      .get(`${url}/meeting?gid=${gid}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("Meeting Info", res.data);
        setMeetingList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getGroupInfo();
    getMembers();
    getAdmin();
    getVote();
    getVoteResult();
    getMeetingInfo();
  }, []);

  const inviteMember = (userId) => {
    if(isAdmin){
      const data = { gid: gid, uid: userId };

      axios
        .post(
          "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/invited",
          data,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          friendClose();
          alert("invite success!");
        })
        .catch((err) => {
          alert(err.response.data.detail);
        });
    }
    else{
      alert("only admin can invite members!");
    }
    
  };

  const [addAdminCheck, setAdminCheck] = useState(false);
  const adminCheckClose = () => setAdminCheck(!addAdminCheck);

  let [isVoteActive] = useState(true);

  let handleOptions = (event) => {
    const vid = event.target.dataset.vid;
    let newState = options.map((op) => {
      if (op.vid === Number(vid)) {
        return { ...op, checked: !op.checked };
      } else {
        return op;
      }
    });
    setOptions(newState);
  };

  const [checkedName, setCheckedName] = useState(null);

  let handleOptionsResult = (event) => {
    setCheckedName(event.target.value); // vid
    // find s_time and e_time by vid
    let day = "";
    let s_time = "";
    let e_time = "";
    result.forEach((el) => {
      if (el.vid === Number(event.target.value)) {
        s_time = el.s_time;
        e_time = el.e_time;
        day = el.day;
      }
    });
    setMeetingInfo((prevMeetingInfo) => ({
      ...prevMeetingInfo,
      sdatetime: day + "T" + s_time,
      edatetime: day + "T" + e_time,
    }));
  };

  const handleSubmitVote = (event) => {
    event.preventDefault();
    console.log("handleSubmitVote");
    let selectedOptions = [];
    options.forEach((option) => {
      if (option.checked) {
        selectedOptions.push(option.vid);
      }
    });
    console.log(selectedOptions); // [1933, 1934, 1935]
    const data = {
      gid: gid,
      vidlist: selectedOptions,
    };
    console.log("handleSubmitVote: ", data);
    axios
      .post(
        `https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/vote`,
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("vote success!");
      })
      .catch((err) => {
        console.log(err);
        // 없을때 404
      });
  };

  const [input, setInput] = useState("");
  const inputRef = useRef();

  const onChange = (e) => {
    setInput(e.target.value);
    inputRef.current.focus();
  };

  const [meetingHour, setMeetingHour] = useState("0");
  const [meetingMin, setMeetingMin] = useState("00");

  const handleMeetingHour = (event) => {
    setMeetingHour(event.target.value);
  };
  const handleMeetingMin = (event) => {
    setMeetingMin(event.target.value);
  };

  const handleGenerateVote = () => {
    console.log("Selected time:", meetingHour, meetingMin);
    getStartDate();
    const data = {
      gid: gid,
      sdatetime: start_date,
      edatetime: end_date,
      meetingtime: meetingHour + ":" + meetingMin,
    };
    axios
      .post(
        "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/votetime",
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("vote successfully generated!");
        getVote();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEndVote = () => {
    axios
      .post(
        `https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/voteresult?gid=${gid}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("vote successfully ended!");
        getVoteResult();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let [meetingInfo, setMeetingInfo] = useState({
    title: "",
    location: "",
    loc_detail: "",
    memo: "",
    sdatetime: "",
    edatetime: "",
    gid: gid,
  });

  const handleMeetingInfo = (event) => {
    const { id, value } = event.target;
    setMeetingInfo((prevMeetingInfo) => ({
      ...prevMeetingInfo,
      [id]: value,
    }));
  };

  const submitMeeting = (e) => {
    e.preventDefault();
    localStorage.setItem("meetingInfo", JSON.stringify(meetingInfo));
    axios
      .post(
        `https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/meeting`,
        meetingInfo,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("submitMeeting", JSON.stringify(response.data));
        alert("submit");
        getUpComing();
      })
      .catch((err) => {
        console.log(meetingInfo);
        console.log(err);
        localStorage.setItem("submitMeeting", JSON.stringify(err));
        alert(err);
      });
  };

  const [name, setName] = useState("");

  const nameSet = (e) => {
    setName(e.target.value);
  };

  const requestFriend = (userId) => {
    const data = { fid: userId };
    axios
      .post(
        "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/request",
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        alert(response.data.msg);
      })
      .catch((err) => {
        // alert(err.response.data.detail, name);
        alert(err.response.data.detail);
      });
  };

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">{gname}</h3>
        <nav aria-label="breadcrumb">
          {/* <p>GID: {gid}</p> */}
          <p>Admin: {admin}</p>
        </nav>
      </div>
      <div className="row">
        <div className="col-6 grid-margin">
          <div className="card">
            <div className="card-body" style={{ height: "400px" }}>
              <h4 className="card-title">
                <i className="mdi mdi-bookmark-check"></i> Upcoming Meeting
              </h4>
              <p className="card-description">This is the next meeting info.</p>
              <div className="table-responsive">
                <table className="table">
                  <tr>
                    <th></th>
                    <th>Content</th>
                  </tr>
                  <tr>
                    <td className="font-weight-bold">MEETING NAME</td>
                    <td>{upcoming.name}</td>
                  </tr>
                  <tr>
                    <td className="font-weight-bold">WHEN</td>
                    <td>{upcoming.when}</td>
                  </tr>
                  <tr>
                    <td className="font-weight-bold">WHERE</td>
                    <td>{upcoming.where}</td>
                  </tr>
                  <tr>
                    <td className="font-weight-bold">MEMO</td>
                    <td>{upcoming.memo}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* 
        <div className="col-6 grid-margin stretch-card">
          <div className="card">
            <h4
              className="card-title"
              style={{
                margin: "2.5vw 0 0 2.5vw",
              }}
            >
              <i className="mdi mdi-account"></i> Members (Admin 아닌계정)
            </h4>

            <div
              className="card-body"
              style={{
                height: "200px",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <div className="table-responsive">
                <table className="table">
                  
                    <tr style={{"text-align":'center'}}>
                      <th style={{"width":'15vw'}}> Name </th>
                      <th style={{"width":'20vw'}}> ID </th>
                      <th style={{"width":'35vw'}}> Actions </th>
                    </tr> 
                  
                  <tbody>
                    {members.map(function (el, idx) {
                      return (
                        <tr style={{"text-align":'center'}}>
                          <td
                            onClick={handleShow}
                            style={{ cursor: "pointer" }}
                          >
                            {el.name}
                          </td>
                          <td
                            onClick={handleShow}
                            style={{ cursor: "pointer" }}
                          >
                            {el.id}
                          </td>
                          <td>
                          <button type="button" className="btn btn-inverse-info btn-sm" style={{"height":'2vw'
                                }}>
                              <Link
                                to={`/mypage/FriendTimetable/${el.gid}`}
                                
                              >
                                <i className="mdi mdi-calendar"></i>

                              </Link>
                            </button>
                            <button
                              type="button"
                              className="btn btn-inverse-warning btn-sm" style={{"height":'2vw'
                            }}
                            >
                              Friend +
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <center style={{"color":"gray", "padding-bottom":'2vw'}}>
              
                <i className="mdi mdi-account-plus"></i>
                &nbsp; To invite new member, ask the admin!
            </center>
          </div>
        </div>
      */}

        <div className="col-6 grid-margin stretch-card">
          <div className="card">
            <h4
              className="card-title"
              style={{
                margin: "2.5vw 0 0 2.5vw",
              }}
            >
              <i className="mdi mdi-account"></i> Members
            </h4>

            <div
              className="card-body"
              style={{
                height: "200px",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {/* <p className="card-description">Click member's name</p> */}
              <div className="table-responsive">
                <table className="table">
                  <tr style={{ "text-align": "center" }}>
                    <th style={{ width: "15vw" }}> Name </th>
                    <th style={{ width: "20vw" }}> ID </th>
                    <th style={{ width: "35vw" }}> Actions </th>
                  </tr>

                  <tbody>
                    {members.map(function (el, idx) {
                      return (
                        <tr style={{ "text-align": "center" }}>
                          <td
                            onClick={handleShow}
                            style={{ cursor: "pointer" }}
                          >
                            {el.name}
                          </td>
                          <td
                            onClick={handleShow}
                            style={{ cursor: "pointer" }}
                          >
                            {el.id}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-inverse-info btn-sm"
                              style={{ height: "2vw" }}
                            >
                              <Link to={`/mypage/FriendTimetable/${el.gid}`}>
                                <i className="mdi mdi-calendar"></i>
                              </Link>
                            </button>
                            <button
                              type="button"
                              className="btn btn-inverse-warning btn-sm"
                              style={{ height: "2vw" }}
                              onClick={() => {
                                requestFriend(el.id);
                              }}
                            >
                              Friend +
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <center>
              <button
                type="button"
                className="btn btn-gradient-primary btn-sm "
                style={{ "font-weight": "420", margin: "2vw" }}
                onClick={friendClose}
              >
                <i className="mdi mdi-account-plus"></i>
                &nbsp;Invite New Member
              </button>
            </center>
          </div>
        </div>
      </div>
      <div className="row">
        <GroupCalContext.Provider value={{ groupCal, fetchGroupCal }}>
          <div
            className="col grid-margin"
            style={{ height: "800px", width: "650px" }}
          >
            <div className="card" style={{ height: "750px", width: "600px" }}>
              <div className="card-body">
                <h4 className="card-title">
                  <i className="mdi mdi-calendar-multiple-check"></i> Group
                  Calender
                </h4>
                <p className="card-description">
                  Click the <span style={{ color: "#fe7c96" }}>pink box</span>{" "}
                  to see available time of the week.
                </p>
                <div style={{ "margin-top": "4vw" }}>
                  <Main
                    gid={gid}
                    meetingList={meetingList}
                    style={{ flexDirection: "column" }}
                  />
                  <br></br>
                  <br></br>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col grid-margin"
            style={{ height: "800px", width: "540px" }}
          >
            <div className="card" style={{ height: "750px", width: "540px" }}>
              <div className="card-body">
                <div className="row">
                  <p
                    className="card-description"
                    style={{ "margin-left": "8em" }}
                  >
                    Your group members are available at..
                  </p>

                  <div
                    id="visit-sale-chart-legend"
                    className="rounded-legend legend-horizontal"
                    style={{ "margin-left": "9em" }}
                  >
                    <ul>
                      <li>
                        <span className="legend-dots bg-primary"></span>1st
                      </li>
                      <li>
                        <span
                          className="legend-dots"
                          style={{ "background-color": "#cc9fff" }}
                        ></span>
                        2nd
                      </li>
                      <li>
                        <span
                          className="legend-dots"
                          style={{ "background-color": "#e0c5ff" }}
                        ></span>
                        3rd
                      </li>
                    </ul>
                  </div>

                  <TimeTable></TimeTable>
                  <div className="row" style={{ margin: "1.5vw 0 0 3vw" }}>
                    <p
                      className="card-description"
                      style={{
                        margin: "0.2vw 1vw 0 0",
                        "text-align": "center",
                      }}
                    >
                      How long will it take?
                    </p>
                    <select
                      className="form-control form-control-sm"
                      id="meeting-hour"
                      value={meetingHour}
                      onChange={(e) => {
                        handleMeetingHour(e);
                      }}
                      style={{
                        position: "relative",
                        width: "4vw",
                        height: "2vw",
                      }}
                    >
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                      <option>13</option>
                      <option>14</option>
                      <option>15</option>
                      <option>16</option>
                      <option>17</option>
                      <option>18</option>
                      <option>19</option>
                      <option>20</option>
                      <option>21</option>
                      <option>22</option>
                      <option>23</option>
                      <option>24</option>
                    </select>
                    <p
                      className="card-description"
                      style={{ margin: "0.2vw 0.5vw", "text-align": "center" }}
                    >
                      hours &nbsp;
                    </p>
                    <select
                      className="form-control form-control-sm"
                      id="meeting-min"
                      value={meetingMin}
                      onChange={(e) => {
                        handleMeetingMin(e);
                      }}
                      style={{
                        position: "relative",
                        width: "4vw",
                        height: "2vw",
                      }}
                    >
                      <option>00</option>
                      <option>30</option>
                    </select>
                    <p
                      className="card-description"
                      style={{ margin: "0.2vw 0.5vw", "text-align": "center" }}
                    >
                      minutes
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-inverse-primary btn-sm"
                    style={{ margin: "1vw 0 0vw 12vw" }}
                    onClick={handleGenerateVote}
                  >
                    <i className="mdi mdi-calendar-plus"></i>
                    <span style={{ "font-size": "15px", "font-weight": "500" }}>
                      &nbsp; Generate Vote
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </GroupCalContext.Provider>
      </div>
      <div className="row">
        {/*
        <div className="col-6 grid-margin stretch-card">
          <div className="card">
            <div
              className="card-body"
              style={{
                height: "500px",
              }}
            >
              <h4 className="card-title">
                <i className="mdi mdi-clipboard-text"></i> Vote (Admin 계정 아닐
                때)
              </h4>
              <p className="card-description">
                Check the box to vote and submit.
              </p>

              <form onSubmit={handleSubmitVote}>
                <div
                  className="card-body"
                  style={{
                    height: "300px",
                    overflowY: "auto",
                    overflowX: "auto",
                    padding: "0vw",
                  }}
                >
                  <table className="table">
                    <tr
                      style={{
                        "text-align": "center",
                      }}
                    >
                      <th>Day</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>
                        <i className="mdi mdi-checkbox-multiple-marked-outline"></i>
                      </th>
                    </tr>
                    {options.map(function (el, idx) {
                      return (
                        <tr
                          key={el.vid}
                          style={{
                            "text-align": "center",
                          }}
                        >
                          <td>{el.day}</td>
                          <td>{el.s_time}</td>
                          <td>{el.e_time}</td>
                          <td>
                            <div
                              className="form-check"
                              style={{
                                "margin-left": "3.5vw",
                              }}
                            >
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={el.checked}
                                  onChange={handleOptions}
                                  data-vid={el.vid}
                                />
                                <i className="input-helper"></i>
                              </label>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>

                <div className="row">
                  <button
                    type="submit"
                    className="btn btn-inverse-primary btn-sm"
                    style={{ margin: "1.5vw 0vw 0vw 14vw" }}
                  >
                    <span style={{ "font-size": "15px", "font-weight": "500" }}>
                      &nbsp;Submit
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        */}

        <div className="col-6 grid-margin stretch-card">
          <div className="card">
            <div
              className="card-body"
              style={{
                height: "500px",
              }}
            >
              <h4 className="card-title">
                <i className="mdi mdi-clipboard-text"></i> Vote
              </h4>
              <p className="card-description">
                Check the box to vote and submit.
              </p>

              <form onSubmit={handleSubmitVote}>
                <div
                  className="card-body"
                  style={{
                    height: "300px",
                    overflowY: "auto",
                    overflowX: "auto",
                    padding: "0vw",
                  }}
                >
                  <table className="table">
                    <tr
                      style={{
                        "text-align": "center",
                      }}
                    >
                      <th>Day</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>
                        <i className="mdi mdi-checkbox-multiple-marked-outline"></i>
                      </th>
                    </tr>
                    {options.map(function (el, idx) {
                      return (
                        <tr
                          key={el.vid}
                          style={{
                            "text-align": "center",
                          }}
                        >
                          <td>{el.day}</td>
                          <td>{el.s_time}</td>
                          <td>{el.e_time}</td>
                          <td>
                            <div
                              className="form-check"
                              style={{
                                "margin-left": "3.5vw",
                              }}
                            >
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={el.checked}
                                  onChange={handleOptions}
                                  data-vid={el.vid}
                                />
                                <i className="input-helper"></i>
                              </label>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>

                <div className="row">
                  <button
                    type="submit"
                    className="btn btn-inverse-primary btn-sm"
                    style={{ margin: "1.5vw 0vw 0vw 10vw" }}
                  >
                    <span style={{ "font-size": "15px", "font-weight": "500" }}>
                      &nbsp;Submit
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-inverse-danger btn-sm"
                    style={{ margin: "1.5vw 0vw 0vw 5vw" }}
                    onClick={handleEndVote}
                  >
                    <span style={{ "font-size": "15px", "font-weight": "500" }}>
                      &nbsp;End vote
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* //Admin 계정 아닐 때 
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                <i className="mdi mdi-poll"></i>
                Vote Result (Admin 계정 아닐 때)
              </h4>
              <p className="card-description">See the vote result!</p>
              <div
                className="card-body"
                style={{
                  height: "350px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  padding: "0vw",
                }}
              >
                <table className="table">
                  <tr
                    style={{
                      "text-align": "center",
                    }}
                  >
                    <th>Day</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>
                      <i className="mdi mdi-account-multiple"></i>
                    </th>
                  </tr>
                  {result.map(function (el, idx) {
                    return (
                      <tr
                        style={{
                          "text-align": "center",
                        }}
                      >
                        <td>{el.day}</td>
                        <td>{el.s_time}</td>
                        <td>{el.e_time}</td>
                        <td>
                          <div className="form-check">
                            <button
                              type="button"
                              className="btn btn-inverse-danger btn-sm"
                              style={{
                                height: "1.5vw",
                                padding: "0.1vw 0.4vw",
                              }}
                            >
                              <i className="mdi mdi-account-outline"> </i>
                              {el.members}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
        */}

        {/* //Admin 계정일 때 */}
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                <i className="mdi mdi-poll"></i>
                Vote Result
              </h4>
              <p className="card-description">See the vote result!</p>

              <div
                className="card-body"
                style={{
                  height: "300px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  padding: "0vw",
                }}
              >
                <table className="table">
                  <tr
                    style={{
                      "text-align": "center",
                    }}
                  >
                    <th>Day</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>
                      <i className="mdi mdi-account-multiple"></i>
                    </th>
                    <th>
                      {" "}
                      <i className="mdi mdi-checkbox-multiple-marked-outline"></i>
                    </th>
                  </tr>
                  {result.map(function (el, idx) {
                    return (
                      <tr
                        style={{
                          "text-align": "center",
                        }}
                      >
                        <td>{el.day}</td>
                        <td>{el.s_time}</td>
                        <td>{el.e_time}</td>
                        <td>
                          <div className="form-check">
                            <button
                              type="button"
                              className="btn btn-inverse-danger btn-sm"
                              style={{
                                height: "1.5vw",
                                padding: "0.1vw 0.4vw",
                              }}
                            >
                              <i className="mdi mdi-account-outline"> </i>
                              {el.members}
                            </button>
                          </div>
                        </td>
                        <td>
                          <div
                            className="form-check"
                            style={{
                              "margin-left": "2vw",
                            }}
                          >
                            <label className="form-check-label">
                              <input
                                type="radio"
                                className="form-check-input"
                                name="resultsRadios"
                                onChange={handleOptionsResult}
                                value={el.vid}
                              />
                              <i className="input-helper"></i>
                            </label>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
              <button
                type="button"
                className="btn btn-inverse-primary btn-sm"
                style={{ margin: "3vw 4vw 0vw 12vw" }}
                onClick={addClose}
              >
                <span style={{ "font-size": "15px", "font-weight": "500" }}>
                  {" "}
                  Make Meeting
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 미팅 정보 메모 */}

      <Modal
        style={{ position: "relative", "margin-left": "0vw" }}
        show={addShow}
        onHide={addClose}
        size="lg"
        centered
      >
        <Modal.Header style={{ "background-color": "#f2edf3" }} closeButton>
          <Modal.Title id="contained-modal-title-md" style={{}}>
            {" "}
            <span style={{ "font-weight": "500", margin: "5vw 0 0 35vw" }}>
              Input Meeting Information
            </span>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitMeeting}>
          <Modal.Body style={{ "background-color": "#f2edf3" }}>
            <div style={{ margin: "0 8vw" }}>
              <table>
                <tr>
                  <td>
                    <div>
                      <label style={{ padding: " 0.7vw 0 0 0" }}>
                        Meeting Name:{" "}
                      </label>
                      <Form.Control
                        type="text"
                        id="title"
                        placeholder="meeting name"
                        value={meetingInfo.title}
                        onChange={handleMeetingInfo}
                        style={{ width: "400px" }}
                      ></Form.Control>{" "}
                      <label style={{ padding: " 0.7vw 0 0 0" }}>Memo </label>
                      <Form.Control
                        type="text"
                        id="memo"
                        value={meetingInfo.memo}
                        onChange={handleMeetingInfo}
                        placeholder="..."
                        style={{ width: "400px" }}
                      ></Form.Control>{" "}
                    </div>
                    <div>
                      <label style={{ padding: " 0.7vw 0 0 0" }}>Where: </label>
                      <div>
                        <Form.Control
                          type="text"
                          id="location"
                          value={meetingInfo.location}
                          onChange={handleMeetingInfo}
                          placeholder="Search the location of your meeting"
                          style={{ width: "330px", float: "left" }}
                          // value={input}
                          ref={inputRef}
                          // onChange={onChange}
                        ></Form.Control>{" "}
                        <div className="input-group-append">
                          <button
                            className="btn btn-sm btn-gradient-primary"
                            type="button"
                            style={{ float: "right", height: "3vw" }}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                      <Form.Control
                        type="text"
                        id="loc_detail"
                        value={meetingInfo.loc_detail}
                        onChange={handleMeetingInfo}
                        placeholder="place of your meeting"
                        style={{ width: "400px" }}
                      ></Form.Control>{" "}
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        width: "650px",
                        height: "300px",
                        "margin-left": "2vw",
                        "background-color": " white",
                      }}
                    >
                      <MapComponent inputRef={inputRef} />
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ "background-color": "#f2edf3" }}>
            <button type="submit" className="btn btn-primary btn-sm">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                addClose();
              }}
            >
              Cancel
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* 어드민인지 확인 */}

      <Modal show={addAdminCheck} onHide={adminCheckClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <div style={{ "font-weight": "200", margin: "0 5vw" }}>
              Sorry, you can't take this action.<br></br> Ask the Group Admin!{" "}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => {
              adminCheckClose();
            }}
          >
            OK
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              adminCheckClose();
            }}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      <AdminBox gid={gid} isAdmin={isAdmin} members={members} />
      <NonAdminBox gid={gid} isAdmin={isAdmin} />

      {/* 친구찾기 */}
      <Modal show={addFriend} onHide={friendClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter the memeber's ID</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="pt-3">
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="ID"
                onChange={nameSet}
                name="name"
                value={name}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => {
              inviteMember(name);
            }}
          >
            OK
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={friendClose}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Group;
