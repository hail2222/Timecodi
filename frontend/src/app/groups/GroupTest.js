import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Main from "./group-timetable/Main";
import { Form } from "react-bootstrap";
import Timeslot from "./group-timetable/components/Timeslot";
import TimeTable from "./group-timetable/components/Time-table";
import AdminBox from "./group-timetable/components/AdminBox";
import { Bar, Doughnut } from "react-chartjs-2";

function Group() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const chartRef = useRef(null);
  const [addShow, setAddShow] = useState(false);
  const addClose = () => setAddShow(!addShow);

  const [addFriend, setFriend] = useState(false);
  const friendClose = () => setFriend(!addFriend);

  let members = ["David Grey", "Stella Johnson", "Marina Michel", "John Doe"];
  let [memberList] = useState(members);

  let [isVoteActive] = useState(true);
  let [options, setOptions] = useState([
    {
      id: 1,
      content: "2023-04-25 14:00 ~ 16:00",
      checked: false,
    },
    {
      id: 2,
      content: "2023-04-25 14:30 ~ 16:30",
      checked: false,
    },
    {
      id: 3,
      content: "2023-04-25 15:00 ~ 17:00",
      checked: false,
    },
    {
      id: 4,
      content: "2023-04-26 13:00 ~ 15:00",
      checked: false,
    },
    {
      id: 5,
      content: "2023-04-25 14:00 ~ 16:00",
      checked: false,
    },
    {
      id: 6,
      content: "2023-04-25 14:30 ~ 16:30",
      checked: false,
    },
    {
      id: 7,
      content: "2023-04-25 15:00 ~ 17:00",
      checked: false,
    },
    {
      id: 8,
      content: "2023-04-26 13:00 ~ 15:00",
      checked: false,
    },
  ]);
  let [result, setResult] = useState([
    {
      id: 1, //setOptions의 id와 구분하기 위해 100번대부터 시작
      place: 1,
      content: "2023-04-25 14:00 ~ 16:00",
      checked: false,
      people: 5,
    },
    {
      id: 2,
      place: 2,
      content: "2023-04-25 14:30 ~ 16:30",
      checked: false,
      people: 3,
    },
    {
      id: 3,
      place: 2,
      content: "2023-04-26 14:30 ~ 16:30",
      checked: false,
      people: 3,
    },
    {
      id: 4,
      place: 3,
      content: "2023-04-25 15:00 ~ 17:00",
      checked: false,
      people: 2,
    },
  ]);
  let handleOptions = (event) => {
    let newState = [...options];
    const { name } = event.target;
    newState.map((op) => {
      if (op.id === Number(name)) {
        op.checked = !op.checked;
      }
    });
    setOptions(newState);
  };
  let handleOptionsResult = (event) => {
    let newStateResult = [...result];
    const { name } = event.target;
    newStateResult.map((op) => {
      if (op.id === Number(name)) {
        op.checked = !op.checked;
      }
    });
    setResult(newStateResult);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(options);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js";
    script.onload = () => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init("14dcf3c6484a4b89bd48acc4844afa01");
        }

        window.Kakao.Share.createDefaultButton({
          container: "#kakaotalk-sharing-btn",
          objectType: "text",
          text: "{{ username }}님이 당신을 '{{ groupname }}'에 초대했습니다! :) 그룹에 가입하려면 아래 버튼을 클릭하세요.",
          link: {
            mobileWebUrl: "http://127.0.0.1:8000/",
            webUrl: "http://127.0.0.1:8000/",
          },
          buttons: [
            {
              title: "그룹 초대",
              link: {
                mobileWebUrl: "http://127.0.0.1:8000/invited/{{ gid }}",
                webUrl: "http://127.0.0.1:8000/invited/{{ gid }}",
              },
            },
          ],
        });
      }
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div style={{ width: "1200px" }}>
      <div className="page-header">
        <h3 className="page-title">Group 1 Admin</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Groups
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Group 1
            </li>
          </ol>
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
                    <th>
                      <button id="kakaotalk-sharing-btn">
                        <img
                          src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
                          alt="카카오톡 공유 보내기 버튼"
                        />
                      </button>
                    </th>
                    <th>Content</th>
                  </tr>
                  <tr>
                    <td className="font-weight-bold">TITLE</td>
                    <td>Band Practice</td>
                  </tr>
                  <tr>
                    <td className="font-weight-bold">WHEN</td>
                    <td>2023년 4월 25일</td>
                  </tr>
                  <tr>
                    <td className="font-weight-bold">WHERE</td>
                    <td>학생회관</td>
                  </tr>
                  <tr>
                    <td className="font-weight-bold">MEMO</td>
                    <td>Bring your headphones:)</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
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
                  <thead>
                    {/* <tr style={{"text-align":'center'}}>
                      <th> Name </th>
                      <th> Actions </th>
                    </tr> */}
                  </thead>
                  <tbody>
                    {memberList.map(function (el, idx) {
                      return (
                        <tr key={idx}>
                          <td
                            onClick={handleShow}
                            style={{ cursor: "pointer" }}
                          >
                            {el}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-inverse-success btn-sm"
                            >
                              TimeTable
                            </button>
                            <button
                              type="button"
                              className="btn btn-inverse-warning btn-sm"
                            >
                              Add friend
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
                onClick={addClose}
              >
                <i className="mdi mdi-account-plus"></i>
                &nbsp;Invite New Member
              </button>
            </center>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card-body">
            <div className="row">
              <div className="card col-md-6">
                <div className="card-body">
                  <h4 className="card-title">
                    <i className="mdi mdi-calendar-multiple-check"></i> Group
                    Calender
                  </h4>
                  <p className="card-description">
                    Click the <span style={{ color: "#fe7c96" }}>pink box</span>{" "}
                    to see available time of the week.
                  </p>
                  <div style={{ "margin-top": "3vw" }}>
                    <Main style={{ flexDirection: "column" }} />
                    <br></br>
                    <br></br>
                  </div>
                </div>
              </div>
              <div className=" card col-md-6">
                <div className="card-body">
                  <p
                    className="card-description"
                    style={{ "margin-left": "0.5vw", "text-align": "center" }}
                  >
                    Your group members are available at..
                  </p>

                  {/* <h2 style={{"margin":"20vw 0 0 7vw"}}>timetable</h2> */}

                  <div
                    id="visit-sale-chart-legend"
                    className="rounded-legend legend-horizontal"
                    style={{ "margin-left": "1vw" }}
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
                  <div className="row" style={{ margin: "1.5vw 0 0 7vw" }}>
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
                    style={{ margin: "1.5vw 0 0 15vw" }}
                  >
                    <i className="mdi mdi-calendar-plus"></i>
                    <span style={{ "font-size": "15px", "font-weight": "500" }}>
                      &nbsp; Generate Vote
                    </span>
                  </button>
                </div>
              </div>
              {/* <button type="button" className="btn btn-primary btn-lg" style={{ "margin-left": '3vw' }}>
                    <i className="mdi mdi-calendar-plus"></i>
                    Edit Meeting Info
                  </button>
                  <button type="button" className="btn btn-secondary btn-lg">
                    <i className="mdi mdi-calendar-plus"></i>
                    Create New Meeting
                  </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
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

              <form onSubmit={handleSubmit}>
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
                      <th>#</th>
                      <th>Time</th>
                      <th>
                        <i className="mdi mdi-checkbox-multiple-marked-outline"></i>
                      </th>
                    </tr>
                    {options.map(function (el, idx) {
                      return (
                        <tr
                          style={{
                            "text-align": "center",
                          }}
                        >
                          <td>{el.id}</td>
                          <td>{el.content}</td>
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
                                  name={el.id}
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
                    type="button"
                    className="btn btn-inverse-primary btn-sm"
                    style={{ margin: "3vw 0vw 0vw 8vw" }}
                  >
                    <span style={{ "font-size": "15px", "font-weight": "500" }}>
                      &nbsp;Submit
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-inverse-danger btn-sm"
                    style={{ margin: "3vw 0vw 0vw 5vw" }}
                    onClick={addClose}
                  >
                    <span style={{ "font-size": "15px", "font-weight": "500" }}>
                      &nbsp;End Vote
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                <i className="mdi mdi-poll"></i>
                Vote Result
              </h4>
              <p className="card-description">See the vote result!</p>
              <form onSubmit={handleSubmit}>
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
                      <th>#</th>
                      <th>Time</th>
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
                          <td>{el.place}</td>
                          <td>{el.content}</td>
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
                                {el.people}
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
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={el.checked}
                                  onChange={handleOptionsResult}
                                  name={el.id}
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
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal show={addShow} onHide={addClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <span style={{ "font-weight": "400", margin: "0 5vw" }}>
              Are you the Admin of this Group?
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row" style={{ margin: "0 8vw" }}>
            <button
              type="button"
              className="btn btn-primary  "
              onClick={addClose}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-danger  "
              onClick={friendClose}
            >
              No
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={addFriend} onHide={friendClose} centered>
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
              friendClose();
              addClose();
            }}
          >
            OK
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              friendClose();
            }}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      <AdminBox />
    </div>
  );
}

export default Group;
