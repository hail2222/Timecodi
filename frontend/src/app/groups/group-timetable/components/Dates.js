import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const Dates = (props) => {
  const { lastDate, firstDate, elm, findToday, month, year, idx, holiday } =
    props;

  const [userInput, setUserInput] = useState({});
  const [evtList, setEvtList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  let dateKey = `${month}` + `${elm}`;
  const registEvent = (value) => {
    setEvtList([...evtList, value]);
    setUserInput('');
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
          <Modal
            elm={elm}
            month={month}
            year={year}
            registEvent={registEvent}
            setOpenModal={setOpenModal}
            openModal={openModal}
            userInput={userInput}
            setUserInput={setUserInput}
          />
        )}
        {holiday !== undefined && (
          <Holidays>
            {holiday !== undefined &&
              holiday.map((evt, index) => {
                let key =
                  elm.length < 2
                    ? `${year}` + `${month}` + `${elm}`
                    : `${year}` + `${month}` + '0' + `${elm}`;
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
                list.slice(0, list.indexOf('_')) === dateKey && (
                  <List
                    key={index}
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    {list.slice(list.indexOf('_') + 1, list.length)}
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
};
const Form = styled.li`
  position: relative;
  padding: 0 0px 0 10px;
  width: 72px;
  height: 72px;
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
  padding: 14px 13px 0 0;
  font-size: 16px;

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
    props.idx >=props.lastDate &&
    props.idx <= props.firstDate&&
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
  padding : 0 7px 0 0px;
`;
const List = styled.span`
  margin-top: 4px;
  padding : 0 6px 0 6px;
  background-color: #ffe5ea;
  border-radius: 2px;
  font-size: 10px;
`;
const Holidays = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
const Holiday = styled.div`
  margin-top: 4px;
  padding-left: 7px;
  color: red;
  font-weight: 700;
  background-color: skyblue;
  border-radius: 5px;
`;

export default Dates;
