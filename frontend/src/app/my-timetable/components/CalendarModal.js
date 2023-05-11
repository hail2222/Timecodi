import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import axios from "axios";

function CalendarModal({ date, openModal, setOpenModal, evtList }) {
  // get schedule list from DB when the modal is opened
  //   useEffect(() => {
  //     axios
  //       .get(`http://127.0.0.1:8000/event?date=${date}`, {
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       })
  //       .then((res) => {
  //         let arr = [];
  //         arr.push(res.data);
  //         console.log(res.data);
  //         setScheduleList(arr[0]);
  //       })
  //       .catch((err) => {
  //         alert(err);
  //       });
  //   }, []);

  return (
    <Form className="card" style={{ width: "fit-content" }}>
      <Header>
        {date}
        <button
          type="button"
          className="btn btn-gradient-primary btn-sm"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          CLOSE
        </button>
      </Header>
      <Container className="table-responsive">
        <Table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {evtList.map(function (evt, i) {
              return (
                <Schedule
                  key={evt.cid}
                  cname={
                    evt.visibility === false || evt.visibility === "private"
                      ? "비공개"
                      : evt.cname
                  }
                  sdatetime={evt.sdatetime}
                  edatetime={evt.edatetime}
                />
              );
            })}
          </tbody>
        </Table>
      </Container>
    </Form>
  );
}

function Schedule({ cname, sdatetime, edatetime }) {
  return (
    <tr>
      <td>{cname}</td>
      <td>{sdatetime}</td>
      <td>{edatetime}</td>
    </tr>
  );
}

const Table = styled.table`
  margin-bottom: 10px;
  td,
  th {
    padding: 5px;
  }
`;

const Form = styled.div`
  position: absolute;
  width: fit-content;
  max-width: 40vw;
  height: fit-content;
  max-height: 20vw;
  border-radius: 10px;
  background-color: #f2edf3;
  text-align: left;
  color: black;
  z-index: 999;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1vw;
  font-weight: 700;
  border-bottom: 2px solid #d3d3d3;
`;
const Close = styled.div`
  position: relative;
  margin: 0.4vw 0.9vw;
  padding: 0.3vw;
  width: 4vw;
  left: 14.5vw;
  bottom: 5.1vw;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: #d3d3d3;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  z-index: 999;
`;
export default CalendarModal;
