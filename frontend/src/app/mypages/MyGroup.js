import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Group from "../groups/Group";

const realURL = "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app";
const localURL = "https://127.0.0.1:8000";
const url = realURL;

function MyGroup(props) {
  const [oo, setOO] = useState(false);
  const history = useHistory();

  let [myGroupList, setMyGroupList] = useState([
    { gid: 1, gname: "my Sample Group 1" },
  ]);
  const getMyGroupList = () => {
    axios
      .get(`${url}/mygrouplist`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        let newMyGroupList = [];
        newMyGroupList.push(res.data);
        setMyGroupList(newMyGroupList[0]);
      })
      .catch((err) => {
        console.log("getMyGroupList");
        console.log(err);
      });
  };
  let [invitedGroupList, setInvitedGroupList] = useState([
    { groupName: "invited Sample Group 1" },
  ]);
  const getInvitedGroupList = () => {
    console.log("get invited group list");
  };

  useEffect(() => {
    getMyGroupList();
    getInvitedGroupList();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [gname, setGname] = useState("default");
  let handleAddGroup = () => {
    const data = {
      gname: gname,
    };
    console.log(data);
    axios
      .post(
        "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/group",
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.success == true) {
          console.log("handleAddGroup");
          console.log(res.data.msg);
          window.location.reload();
        }
      })
      .catch((err) => {
        // AxiosError: Request failed with status code 422
        alert(err);
      });
    handleClose();
  };

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

  return (
    <>
      <div className="page-header">
        <h3 className="page-title">My Groups</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                My Page
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              My Groups
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-baseline mb-2">
                <div>
                  <h4 className="card-title">I'm in</h4>
                  <p className="card-description">My group list</p>
                </div>
                <button
                  type="button"
                  className="btn btn-gradient-primary btn-icon-text"
                  onClick={handleShow}
                >
                  <i className="mdi mdi-plus-circle"></i> Create New Group
                </button>
                <Modal show={showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Create New Group</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={gname}
                          onChange={(e) => setGname(e.target.value)}
                          readOnly={false}
                        ></Form.Control>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Back
                    </Button>
                    <Button variant="primary" onClick={handleAddGroup}>
                      Create
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="d-flex justify-content-between align-items-baseline mb-2"></div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Group ID</th>
                      <th>Group Name</th>
                      <th>Edit Menu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myGroupList.map(function (item, index) {
                      return (
                        <tr key={index}>
                          <td>{item.gid}</td>
                          <td>{item.gname}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                            >
                              <Link
                                to={`/groups/groupTestAdmin/${item.gid}`}
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                              >
                                Go
                              </Link>
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                            >
                              Leave
                            </button>
                            <button
                              type="button"
                              className="btn btn-warning btn-sm"
                            >
                              <i className="mdi mdi-star"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Invited</h4>
              {/* <p className="card-description">
                Click the group name and see the details.
              </p> */}
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>Group Name</th>
                      <th>Accept/Decline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invitedGroupList.map(function (item, index) {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.groupName}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                            >
                              Decline
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyGroup;
