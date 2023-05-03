import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";

function CalendarModal({ elm, month, year, openModal, setOpenModal }) {
  /* DB에서 특정 날짜 일정만 가져오는 기능 추가할것 */
  let [scheduleList, setScheduleList] = useState([
    {
      cid: 0,
      cname: "캡스톤프로젝트 수업",
      startTime: "12:00",
      endTime: "14:45",
      description: "설명을 길게길게길게길게길게길게길게길게",
    },
    {
      cid: 1,
      cname: "동아리",
      startTime: "16:00",
      endTime: "17:00",
      description: "동아리 모임",
    },
    {
      cid: 2,
      cname: "저녁 약속",
      startTime: "19:00",
      endTime: "23:00",
      description: "친구랑",
    },
  ]);
  return (
    <Form className="card" style={{ width: "fit-content" }}>
      <Header>
        {year}.{month}.{elm}
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
            <th>Title</th>
            <th>Start</th>
            <th>End</th>
            <th>Description</th>
          </thead>
          <tbody>
            {scheduleList.map(function (s, i) {
              return (
                <Schedule
                  cname={scheduleList[i].cname}
                  startTime={scheduleList[i].startTime}
                  endTime={scheduleList[i].endTime}
                  description={scheduleList[i].description}
                />
              );
            })}
          </tbody>
        </Table>
      </Container>
    </Form>
  );
}

function Schedule({ cname, startTime, endTime, description }) {
  return (
    <tr>
      <td>{cname}</td>
      <td>{startTime}</td>
      <td>{endTime}</td>
      <td>{description}</td>
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
  max-width: 25vw;
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
