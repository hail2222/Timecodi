import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Dates from "./Dates";
import axios from "axios";
import url from "./../../../apiurl";

function AdminBox(props) {
  const gid = props.gid;
  const isAdmin = props.isAdmin;

  const { totalDate, today, month, year } = props;

  const [show, setShow] = useState(false);

  // let members = ["David Grey","David Grey","David Grey", "Stella Johnson","Stella Johnson","Stella Johnson", "Marina Michel", "John Doe"];
  // let [memberList] = useState(members);
  let members = props.members;

  const [addShow, setAddShow] = useState(false);
  const addClose = () => setAddShow(!addShow);
  const handleShow = () => setShow(true);

  //today

  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
  };

  const transferAdmin = (userId) => {
    const data = { gid: gid, uid: userId };
    axios
      .put(url + "/admin", data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert("transfer!");
      })
      .catch((err) => {
        alert(err.response.data.detail);
      });
  };

  const kickOut = (userId) => {
    const data = { gid: gid, uid: userId };
    console.log(data);
    axios
      .delete(url + "/admin", {
        data: data,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert(response.data.success);
      })
      .catch((err) => {
        alert(err.response.data.detail);
      });
  };

  const withdrawGroup = (gid) => {
    const data = { gid: gid };
    axios
      .delete(url + "/member", {
        data: data,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert(response.data.msg);
      })
      .catch((err) => {
        alert(err.response.data.detail);
      });
  };

  const deleteGroup = (gid) => {
    const data = { gid: gid };
    axios
      .delete(url + "/group", {
        data: data,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert(response.data.msg);
      })
      .catch((err) => {
        alert("err!");
      });
  };

  if (isAdmin) {
    return (
      <div
        className="col-12 grid-margin stretch-card"
        style={{ padding: "0vw 0vw", margin: "1.3vw" }}
      >
        <div
          className="card row"
          style={{
            height: "500px",
          }}
        >
          <div className="col-md-6">
            <h4
              className="card-title"
              style={{
                margin: "2.5vw 0 0 2.5vw",
              }}
            >
              <i className="mdi mdi-settings"></i> &nbsp;Admin
            </h4>

            <div
              className="card-body"
              style={{
                height: "400px",
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
                              onClick={() => {
                                transferAdmin(el.id);
                              }}
                            >
                              Transfer Admin
                            </button>
                            <button
                              type="button"
                              className="btn btn-inverse-danger btn-sm"
                              onClick={() => {
                                kickOut(el.id);
                              }}
                            >
                              Kick out
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
          <div className="col-md-6">
            <h4
              className="card-title"
              style={{
                margin: "2.5vw 0 0 2.5vw",
                color: "#FA5C7D",
              }}
            >
              <i class="mdi mdi-alert btn-icon-prepend"></i>&nbsp;Danger Zone{" "}
            </h4>
            <div className="card-body">
              <p
                className="card-description"
                style={{ padding: "0.2vw 1vw 0vw 0", "text-align": "left" }}
              >
                I hope you know what you are doing.. Next actions are
                irreversible.<br></br>If you leave the group without
                transferring the Admin to another member, the member who joined
                the group first among the remaining people will gain the Admin's
                authority.
              </p>
              <div style={{ margin: "0 5vw" }}>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-rounded btn-sm"
                  onClick={() => {
                    withdrawGroup(gid);
                  }}
                >
                  Withdraw from group
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-rounded btn-sm"
                  onClick={() => {
                    deleteGroup(gid);
                  }}
                >
                  Delete group
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default AdminBox;
