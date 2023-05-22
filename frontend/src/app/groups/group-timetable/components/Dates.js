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
const Lists = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding : 0 0.42em 0 0;
`;
const List = styled.span`
  margin-top: 4px;
  padding : 0 0.36em 0 36em;
  background-color: #ffe5ea;
  border-radius: 0.12em;
  font-size: 0.6em;
`;



export default Dates;
