import React, { useState, useRef, useEffect } from 'react'
import { Modal } from "react-bootstrap";
import { Form } from 'react-bootstrap';
import FriendsTable from './FriendsTable';

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
      text : 'Name',
      value : 'name'
    },
    {
      text : 'Actions',
      value : 'actions'
    }
  ]

  const [items, setItems] = useState([]);

  const getFriends = () => {
    axios
    .get("https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/friend", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      let friendList = [];
      response.data.forEach((rel, index)=>{
        const friends = {id: index+1, name: rel.fid};
        friendList.push(friends);
      });
      setItems(friendList);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getFriends();
  }, []);

  const [name, setName] = useState("");

  const onChange = (e) => {
    setName(e.target.value);
  }

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

  //   setItems([...items, friend])
  //   setInput({
  //     name: ''
  //   })
  //   nextId.current += 1;
  // }

  const onCreate = () => {
    const data = {"fid": name};
    axios
    .post("https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/friend", data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      console.log(response.data.msg);
      getFriends();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // const onDel = id => {
  //   setItems(items.filter(friend => friend.id !== id));
  // }

  const onDel = (id) => {
    const data = {"fid": items.filter(friend => friend.id == id)[0].name};
    axios
    .delete("https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/friend", {
      data: data,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      console.log(response.data.msg);
      getFriends();
    })
    .catch((err) => {
      console.log(err);
    });
  }

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-account-star"></i>
            </span> Friends </h3>
            <button type="button" className="btn btn-inverse-primary" onClick={friendClose}>
              <span className="mr-2"><i className="mdi mdi-account-plus"></i></span>Add
            </button>
            <Modal show={addFriend} onHide={friendClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Enter your friend's ID</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="pt-3">
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="ID" onChange={onChange} name="name" value={name}/>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <button type="button" className="btn btn-primary btn-sm" onClick={onCreate}>
                  OK
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={friendClose}>
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
                  <FriendsTable 
                    friends={items} onDel={onDel}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }

export default FriendsPage;