import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CalendarModal from "./CalendarModal";
import axios from "axios";

const sampleEvtList = [
  {
    cid: 1010101,
    cname: "My sample event",
    visibility: true,
    sdatetime: "2023-05-04T14:00:00",
    edatetime: "2023-05-04T15:00:00",
    weekly: 0,
    enddate: null,
  },
  {
    cid: 2020202,
    cname: "샘플이벤트2",
    visibility: false,
    sdatetime: "2023-05-04T16:00:00",
    edatetime: "2023-05-05T15:00:00",
    weekly: 0,
    enddate: null,
  },
  {
    cid: 20202023,
    cname: "샘플이벤트3",
    visibility: false,
    sdatetime: "2023-05-04T16:00:00",
    edatetime: "2023-05-05T15:00:00",
    weekly: 0,
    enddate: null,
  },
  {
    cid: 20202024,
    cname: "샘플이벤트4",
    visibility: false,
    sdatetime: "2023-05-04T16:00:00",
    edatetime: "2023-05-05T15:00:00",
    weekly: 0,
    enddate: null,
  },
  {
    cid: 20202025,
    cname: "샘플이벤트5",
    visibility: false,
    sdatetime: "2023-05-04T16:00:00",
    edatetime: "2023-05-05T15:00:00",
    weekly: 0,
    enddate: null,
  },
  {
    cid: 20202026,
    cname: "샘플이벤트6",
    visibility: false,
    sdatetime: "2023-05-04T16:00:00",
    edatetime: "2023-05-05T15:00:00",
    weekly: 0,
    enddate: null,
  },
];

function Dates({
  lastDate,
  firstDate,
  elm,
  findToday,
  month,
  year,
  idx,
  holiday,
}) {
  let date = `${year}-${month}-${elm}`;
  const [evtList, setEvtList] = useState(sampleEvtList);
  /*   {
      cid: elm.cid,
      cname: elm.cname,
      visibility: elm.visibility,
      sdatetime: elm.sdatetime,
      edatetime: elm.edatetime,
      weekly: elm.weekly,
      enddate: elm.enddate,
    } */

  useEffect(() => {
    axios
      .get(
        `https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/event?date=${date}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        let newEvtList = [];
        newEvtList.push(res.data);
        setEvtList(newEvtList[0]);
        setOpenModal(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Form onDoubleClick={handleOpen}>
        <TodayCSS findToday={findToday}>{elm}</TodayCSS>
        <ScrollDiv>
          <Lists className="list-ticked">
            {evtList !== undefined &&
              evtList.map((evt, index) => {
                return (
                  <List key={evt.cid}>
                    {evt.visibility === false || evt.visibility === "private"
                      ? "비공개"
                      : evt.cname}
                  </List>
                );
              })}
          </Lists>
        </ScrollDiv>
        {openModal && (
          <CalendarModal
            date={date}
            setOpenModal={setOpenModal}
            openModal={true}
            evtList={evtList}
          />
        )}
      </Form>
    </>
  );
}

const Form = styled.li`
  position: relative;
  padding: 0 0vw 0 0.7vw;
  width: 7vw;
  height: 8vw;
  text-align: left;
  border-bottom: 1px solid #e4e3e6;
  border-left: 1px solid #e4e3e6;
  list-style: none;
  font-size: 1.1rem;
  :nth-child(7n + 1),
  :nth-child(7n) {
    color: #969696;
    background-color: #f5f5f5;
  }
`;
const TodayCSS = styled.span`
  ${(props) =>
    props.findToday &&
    props.idx >= props.lastDate &&
    props.idx <= props.firstDate &&
    ` position: relative;
    padding: .5vw;
    // border-radius: 50%;
    font-size: 1.2vw;
    font-weight: 700;
    color: #fe7c96;
    // background-color:#fe7c96;
 `}
`;
const ScrollDiv = styled.div`
  overflow: auto;
  height: 70px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;
const Lists = styled.ul`
  padding: 0;
`;
const List = styled.li`
  margin-top: 0.2vw;
  padding: 0;
  font-size: 0.7vw;
`;
const Holidays = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
const Holiday = styled.div`
  margin-top: 0.3vw;
  padding-left: 0.5vw;
  color: red;
  font-weight: 700;
  background-color: skyblue;
  border-radius: 5px;
`;

export default Dates;
