import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const MeetingInfoModal = (props) => {
  const { meetingInfo, setOpenModal } = props;
  const emptyMeetingInfo = [
    {
      edatetime: "",
      gid: 0,
      loc_detail: "",
      location: "",
      meetid: 0,
      memo: "",
      sdatetime: "",
      title: "No Meeting Info",
    },
  ];

  if (meetingInfo === undefined || meetingInfo === []) {
    meetingInfo = emptyMeetingInfo;
  }

  return (
    <Form>
      <Header>
        <h4>Meeting Info</h4>
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
      <Container>
        {meetingInfo &&
          meetingInfo.map((info, index) => {
            return (
              <Table className="table" key={index}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Contents</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Title</td>
                    <td>{info.title}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Start</td>
                    <td>{info.sdatetime}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>End</td>
                    <td>{info.edatetime}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Location</td>
                    <td>{info.location}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Location Detail</td>
                    <td>{info.loc_detail}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Memo</td>
                    <td>{info.memo}</td>
                  </tr>
                </tbody>
              </Table>
            );
          })}
      </Container>
    </Form>
  );
};

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
  max-width: 30vw;
  overflow: auto;
  height: fit-content;
  max-height: 30vw;
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

export default MeetingInfoModal;
