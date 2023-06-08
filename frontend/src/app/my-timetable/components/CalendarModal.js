import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import axios from "axios";

function CalendarModal({ date, openModal, setOpenModal, evtList }) {
  const initEvt = {
    cid: "",
    cname: "",
    sdatetime: "",
    edatetime: "",
    visibility: "",
    weekly: "",
    enddate: "",
  };
  let [updateEventContent, setUpdateEventContent] = useState(initEvt);
  //   let deleteall = false;
  const [deleteall, setDeleteAll] = useState(false);

  const [showUpdateEvent, setShowUpdateEvent] = useState(false); // edit 버튼 눌렀을때 밑에 보이게 하는

  const handleUpdateEvent = (e, cid) => {
    // edit 버튼 눌림
    // console.log("e, cid", e, cid);
    // console.log("CalendarModal", evtList);
    // cid에 해당하는 이벤트를 evtList에서 찾아서 updateEventContent에 저장
    if (evtList !== undefined) {
      evtList.map((evt, index) => {
        if (evt.cid === cid) {
          console.log("evt", evt);
          setUpdateEventContent(evt);
        }
      });
    }
    setShowUpdateEvent(true);
  };

  const putEvent = () => {
    // updateEventContent를 서버에 전송
    setShowUpdateEvent(false);
    /* 
    const data = {};
    axios
      .put(`https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/event`, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Event Updated.");
      })
      .catch((err) => {
        console.log(err);
      });
       */
  };
  const deleteEvent = () => {
    // cid, deleteall(t/f)
    const data = { cid: updateEventContent.cid, deleteall: deleteall };
    console.log(data);
    axios
      .delete(
        `https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/event?cid=${data.cid}&deleteall=${data.deleteall}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("Event Deleted.");
        setUpdateEventContent(initEvt);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Event Delete Failed.");
      });
  };

  useEffect(() => {
    console.log("UpdateEventContent", updateEventContent);
  }, [updateEventContent]);

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
              <th>Edit</th>
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
      {showUpdateEvent && (
        <Container>
          <label>/my-timetable/timetable.js 참고 </label>
          <button
            type="button"
            className="btn btn-inverse-secondary btn-sm"
            onClick={() => {
              setShowUpdateEvent(false);
            }}
          >
            Close
          </button>
          <br></br>
          <label className="form-check-label">
            delete all repeated schedules?{"          "}
            <input
              type="checkbox"
              className="form-check-input"
              checked={deleteall}
              onChange={() => {
                setDeleteAll(!deleteall);
              }}
            />
            <i className="input-helper"></i>{" "}
          </label>

          <button
            type="button"
            className="btn btn-inverse-danger btn-sm"
            onClick={() => {
              deleteEvent();
            }}
          >
            DELETE
          </button>
        </Container>
      )}
    </Form>
  );

  function Schedule({ cid, cname, sdatetime, edatetime }) {
    return (
      <tr>
        <td>{cname}</td>
        <td>{sdatetime}</td>
        <td>{edatetime}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={(e) => handleUpdateEvent(e, cid)}
          >
            EDIT
          </button>
        </td>
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
