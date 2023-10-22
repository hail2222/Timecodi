import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from "axios";
import apiurl from "./../apiurl";

export default function Withdrawal() {
  const history = useHistory();
  const [withdrawal, setWithdrawal] = useState(false);
  const withdrawalClose = () => {
    setWithdrawal(!withdrawal);
  };

  const withdraw = () => {
    axios
      .delete(url + "/account", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert(response.data.msg);
        withdrawalClose();
        history.push("/user-pages/login-1");
      })
      .catch((err) => {
        alert("err!");
      });
  };

  return (
    <Link className="nav-link" onClick={withdrawalClose}>
      Withdrawal
      <Modal show={withdrawal} onHide={withdrawalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Withdrawal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="font-weight-light">
            This is not a logout. <br />
            If you withdraw, all your data will be deleted and you will not be
            able to use the service. Are you sure you want to withdraw?
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={withdraw}
          >
            YES
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={withdrawalClose}
          >
            NO
          </button>
        </Modal.Footer>
      </Modal>
    </Link>
  );
}
