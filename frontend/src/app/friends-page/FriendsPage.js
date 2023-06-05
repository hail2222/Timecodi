import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import FriendsTable from "./FriendsTable";

import { useHistory } from "react-router-dom";
import axios from "axios";

function FriendsPage() {
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

  const [addFriend, setFriend] = useState(false);
  const friendClose = () => setFriend(!addFriend);

  const headers = [
    {
      text: "Name",
      value: "name",
    },
    {
      text: "Actions",
      value: "actions",
    },
  ];

  const [friends, setFriends] = useState([]);
  const [requestFriends, setRequestFriends] = useState([]);

  const getFriends = () => {
    axios
      .get(
        "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/friend",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        let friendList = [];
        response.data.forEach((rel, index) => {
          const friends = { id: index + 1, name: rel.name, userId: rel.id };
          friendList.push(friends);
        });
        setFriends(friendList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRequestedFriends = () => {
    axios
      .get(
        "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/request",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        let requestedList = [];
        res.data.forEach((elm, index) => {
          requestedList.push({id: elm.id, name: elm.name});
        });
        setRequestFriends(requestedList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFriends();
    getRequestedFriends();
  }, []);

  const [name, setName] = useState("");

  const onChange = (e) => {
    setName(e.target.value);
  };

  // const [input, setInput] = useState({
  //   name : ''
  // })

  // const { name } = input;

  // const onChange = e => {
  //   const { name, value } = e.target;
  //   setInput({
  //     ...input,
  //     [name]: value
  //   })
  // }

  // const nextId = useRef(6);

  // const onCreate = () => {
  //   const friend = {
  //     id: nextId.current,
  //     name
  //   }

  //   setFriends([...friends, friend])
  //   setInput({
  //     name: ''
  //   })
  //   nextId.current += 1;
  // }
  const requestFriend = () => {
    const data = { fid: name };
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
        alert(response.data.msg, name);
        setFriend(!addFriend);
      })
      .catch((err) => {
        // alert(err.response.data.detail, name);
        console.log(err.response.data.detail, name);
      });
  };

  //   const onCreate = () => {
  //     const data = { fid: name };
  //     axios
  //       .post(
  //         "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/friend",
  //         data,
  //         {
  //           headers: {
  //             Authorization: localStorage.getItem("token"),
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response.data.msg);
  //         getFriends();
  //       })
  //       .catch((err) => {
  //         alert(err.response.data.detail);
  //       });
  //   };

  // const onDel = id => {
  //   setFriends(friends.filter(friend => friend.id !== id));
  // }

  const onDel = (id) => {
    const data = { fid: friends.filter((friend) => friend.id == id)[0].userId };
    axios
      .delete(
        "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/friend",
        {
          data: data,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data.msg);
        getFriends();
      })
      .catch((err) => {
        alert(err.response.data.detail);
      });
  };

  const acceptFriend = (id) => {
    console.log("acceptFriend: ", id);
    const data = { fid: id };
    axios
      .post(
        "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/accept",
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        alert(response.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        // alert(err.response.data.detail);
        console.log(err.response.data.detail);
      });
  };

  const DeleteRequestFriend = (id) => {
    const data = { fid: id };
    axios
      .delete(
        "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/accept",
        {
          data: data,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        alert(response.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data.detail);
      });
  };

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white mr-2">
            <i className="mdi mdi-account-star"></i>
          </span>{" "}
          Friends{" "}
        </h3>
        <button
          type="button"
          className="btn btn-inverse-primary"
          onClick={friendClose}
        >
          <span className="mr-2">
            <i className="mdi mdi-account-plus"></i>
          </span>
          Add
        </button>
        <Modal show={addFriend} onHide={friendClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Enter your friend's ID</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="pt-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="ID"
                  onChange={onChange}
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
              onClick={requestFriend}
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

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <FriendsTable friends={friends} onDel={onDel} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
                <h4 className="card-title">Requested</h4>
                <p className="card-description">
                  They want to be friends with me!
                </p>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requestFriends.map(function (item, index) {
                        return (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.id}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={() => acceptFriend(item.id)}
                              >
                                Accept
                              </button>
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={() => DeleteRequestFriend(item.id)}
                              >
                                Delete
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
    </div>
  );
}

export default FriendsPage;
