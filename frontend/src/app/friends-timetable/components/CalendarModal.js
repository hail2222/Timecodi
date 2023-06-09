import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Container } from "react-bootstrap";
import axios from "axios";

function CalendarModal({ date, openModal, setOpenModal, evtList }) {
  return (
    <Forms className="card" style={{ width: "fit-content" }}>
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
                  cid={evt.cid}
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
    </Forms>
  );

  function Schedule({ cid, cname, sdatetime, edatetime }) {
    return (
      <tr>
        <td>{cname}</td>
        <td>{sdatetime}</td>
        <td>{edatetime}</td>
      </tr>
    );
  }
}

const Table = styled.table`
  margin-bottom: 10px;
  td,
  th {
    padding: 5px;
  }
`;

const Forms = styled.div`
  position: absolute;
  width: fit-content;
  max-width: 40vw;
  height: fit-content;
  max-height: 40vw;
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
export default CalendarModal;
