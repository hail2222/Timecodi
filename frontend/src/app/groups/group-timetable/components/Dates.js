import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import MeetingInfoModal from "./MeetingInfoModal";

const Dates = (props) => {
  const {
    lastDate,
    firstDate,
    elm,
    findToday,
    month,
    year,
    idx,
    meetingInfo,
    holiday,
  } = props;

  // meetingInfo 빈 배열일 가능성이 높음

  const [userInput, setUserInput] = useState({});
  const [evtList, setEvtList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  let dateKey = `${month}` + `${elm}`;
  const registEvent = (value) => {
    setEvtList([...evtList, value]);
    setUserInput("");
    setOpenModal(false);
  };

  return (
    <>
      <Form
        onDoubleClick={() => {
          setOpenModal(true);
        }}
      >
        <DateNum
          idx={idx}
          lastDate={lastDate}
          firstDate={firstDate}
          findToday={findToday}
        >
          {/* <TodayCSS findToday={findToday}>{elm}</TodayCSS>일 */}

          <TodayCSS findToday={findToday}>{elm}</TodayCSS>
        </DateNum>
        {openModal && (
          <MeetingInfoModal
            setOpenModal={setOpenModal}
            meetingInfo={meetingInfo ? meetingInfo : []}
          ></MeetingInfoModal>
        )}
        {meetingInfo && meetingInfo !== [] && (
          <ScrollDiv>
            {meetingInfo.map((list, index) => {
              return <MeetingTitle key={index}>{list.title}</MeetingTitle>;
            })}
          </ScrollDiv>
        )}
      </Form>
    </>
  );
};
const Form = styled.li`
  position: relative;
  padding: 0 0px 0 0.6em;
  width: 4.1em;
  height: 4.1em;
  text-align: left;
  border-bottom: 1px solid #e4e3e6;
  border-left: 1px solid #e4e3e6;
  list-style: none;
  font-size: 1.1rem;
  :nth-child(7n + 1),
  :nth-child(7n) {
    color: #969696;
    // background-color: #f5f5f5;
  }
`;

const DateNum = styled.div`
  padding: 0.5em 0.6em 0 0;
  font-size: 1em;
  color: black;

  ${(props) => props.idx < props.lastDate && `color: #969696;`};

  ${(props) =>
    props.firstDate > 0 &&
    props.idx > props.firstDate - 1 &&
    `
    color: #969696;
  `};
`;

const TodayCSS = styled.span`
  ${(props) =>
    props.findToday &&
    props.idx >= props.lastDate &&
    props.idx <= props.firstDate &&
    ` position: relative;
    padding: 7px;
    // border-radius: 50%;
    font-size: 12px;
    font-weight: 700;
    color: #fe7c96;
    // background-color:#fe7c96;
 `}
`;
const ScrollDiv = styled.div`
  overflow: auto;
  height: 7.2em;
  &::-webkit-scrollbar {
    width: 0.48em;
    height: 0.48em;
    border-radius: 0.3em;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0.3em;
  }
`;

const MeetingTitle = styled.div`
  font-size: 0.8em;
  color: #969696;
`;

export default Dates;
