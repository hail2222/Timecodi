import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Main from './group-timetable/Main';
import { Form } from 'react-bootstrap';

function Group() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  ]);
  let handleOptions = (event) => {
    let newState = [...options];
    const { name } = event.target;
    newState.map((op) => {
      if (op.id === Number(name)) {
        op.checked = true;
      }
    });
    setOptions(newState);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(options);
  };

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Group 1</h3>
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
        <div className="col-4 grid-margin">
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
        <div className="col-8 grid-margin stretch-card">
          <div className="card">
            <div
              className="card-body"
              style={{
                height: "400px",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <h4 className="card-title">
                <i className="mdi mdi-poll"></i> Vote
              </h4>
              <p className="card-description">
                Submit 버튼을 클릭하면 콘솔창에 출력됩니다. checked 항목 참고
              </p>
              <form onSubmit={handleSubmit}>
                <div className="table-responsive">
                  <table className="table">
                    <tr>
                      <th>#</th>
                      <th>Time</th>
                      <th>
                        <i className="mdi mdi-checkbox-multiple-marked-outline"></i>
                      </th>
                    </tr>
                    {options.map(function (el, idx) {
                      return (
                        <tr>
                          <td>{el.id}</td>
                          <td>{el.content}</td>
                          <td>
                            <div className="form-check">
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
                <button
                  type="submit"
                  className="btn btn-gradient-primary btn-block"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-7">
                  <h4 className="card-title">
                    <i className="mdi mdi-calendar-multiple-check"></i> Group
                    Calender
                  </h4>
                  <p className="card-description">Group Calender</p>
                  <Main style={{ flexDirection: 'column' }} />
                  <br></br><br></br>
                  <button type="button" className="btn btn-primary btn-lg" style={{ "margin-left": '3vw' }}>
                    <i className="mdi mdi-calendar-plus"></i>
                    Edit Meeting Info
                  </button>
                  <button type="button" className="btn btn-secondary btn-lg">
                    <i className="mdi mdi-calendar-plus"></i>
                    Create New Meeting
                  </button>
                </div>
                <div className="col-md-5">
                <h2 style={{"margin":"20vw 0 0 7vw"}}>timetable</h2>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                <i className="mdi mdi-account"></i> Members
              </h4>
              <p className="card-description">Click member's name</p>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> ID </th>
                      <th> Name </th>
                      <th> Actions </th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberList.map(function (el, idx) {
                      return (
                        <tr>
                          <td>0</td>
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
              <button
                type="button"
                className="btn btn-gradient-primary btn-md btn-block"
              >
                <i className="mdi mdi-account-plus"></i>
                Invite New Member
              </button>
            </div>
          </div>
        </div>

        <div className="col-4 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">테스트용입니다</h4>
              <button
                type="button"
                className="btn btn-gradient-primary btn-lg btn-block"
                onClick={handleShow}
              >
                Launch demo modal
              </button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Woohoo, you are reading this text in a modal! 테스트
                </Modal.Body>
                <Modal.Footer>
                  <button
                    type="button"
                    className="btn btn-gradient-secondary btn-lg btn-block"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-gradient-primary btn-lg btn-block"
                    onClick={handleClose}
                  >
                    Save Changes
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Group;
