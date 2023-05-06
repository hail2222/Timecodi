import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CalendarModal from "./CalendarModal";

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
  const [evtList, setEvtList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  let dateKey = `${month}` + `${elm}`;
  //   const registEvent = (value) => {
  //     setEvtList([...evtList, value]);
  //     setOpenModal(false);
  //   };

  return (
    <>
      <Form onDoubleClick={handleOpen}>
        <TodayCSS findToday={findToday}>{elm}</TodayCSS>
        {openModal && (
          <CalendarModal
            elm={elm}
            month={month}
            year={year}
            setOpenModal={setOpenModal}
            openModal={true}
          />
        )}
        {holiday !== undefined && (
          <Holidays>
            {holiday !== undefined &&
              holiday.map((evt, index) => {
                let key =
                  elm.length < 2
                    ? `${year}` + `${month}` + `${elm}`
                    : `${year}` + `${month}` + "0" + `${elm}`;
                return (
                  Number(key) === evt.locdate && (
                    <Holiday key={index}>{evt.dateName}</Holiday>
                  )
                );
              })}
          </Holidays>
        )}
        {Boolean(evtList[0]) && (
          <ScrollDiv>
            <Lists>
              {evtList.map((list, index) => {
                return (
                  list.slice(0, list.indexOf("_")) === dateKey && (
                    <List key={index} onClick={handleOpen}>
                      {list.slice(list.indexOf("_") + 1, list.length)}
                    </List>
                  )
                );
              })}
            </Lists>
          </ScrollDiv>
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
const Lists = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0 0.5vw 0 0vw;
`;
const List = styled.span`
  margin-top: 0.3vw;
  padding: 0 0.4vw 0 0.4vw;
  background-color: #ffe5ea;
  border-radius: 2px;
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
