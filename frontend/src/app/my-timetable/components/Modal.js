import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Modal = (props) => {
  const {
    elm,
    month,
    year,
    startDate,
    endDate,
    registEvent,
    setOpenModal,
    userInput,
    setUserInput,
  } = props;

  const userText = (e) => {
    let date = `${month}` + `${elm}`;

    setUserInput(`${date}_` + e.target.value);
  };

  return (
    <Form>
      <Header>Input Schedule</Header>
      <ViewDate>
        Date: {year}.{month}.{elm}
      </ViewDate>
      <StartDate>
        <input type="datetime-local" id="event_sdue" value="start"></input>
      </StartDate>
      <EndDate>
      <input type="datetime-local" id="event_sdue" value="start"></input>
      </EndDate>
      <Events>
        <Contexts
          placeholder="  Enter your schedule."
          onChange={(e) => {
            userText(e);
          }}
        >

        </Contexts>
        <RegistBtn
          onClick={() => {
            registEvent(userInput);
          }}
        >
          ADD
        </RegistBtn>
        <Close
          onClick={() => {
            setOpenModal(false);
          }}
        >
          CLOSE
        </Close>
      </Events>


    </Form>
  );
};

const Form = styled.div`
  position: absolute;
  width: 20vw;
  height: 10vw;
  border-radius: 10px;
  background-color: #f2edf3;
  text-align: left;
  color: black;
  z-index: 999;
`;
const Header = styled.div`
  padding: 1vw 0 0.5vw 1vw;
  font-weight: 700;
  border-bottom: 2px solid #d3d3d3;
`;

const ViewDate = styled.div`
  padding: 0.4vw 0 0.3vw 1vw;
  border-bottom: 2px solid #d3d3d3;
`;
const StartDate = styled.div`
  padding: 0.4vw 0 0.3vw 1vw;
  border-bottom: 2px solid #d3d3d3;
`;
const EndDate = styled.div`
  padding: 0.4vw 0 0.3vw 1vw;
  border-bottom: 2px solid #d3d3d3;
`;
const Events = styled.div``;
const Contexts = styled.textarea`
  background-color: #f2edf3;
  padding: 1vw 0 0 0.5vw;
  width: 100%;
  border: none;
  height: 6vw;
  border-radius: 10px;
`;
const RegistBtn = styled.div`
  position: relative;
  margin: 0.4vw 0.9vw;
  padding: 0.3vw;
  width: 3vw;
  left: 0;
  bottom: 3vw;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: #d3d3d3;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;

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
const InputCss = styled.div`
  position: absolute;
  margin: 0.4vw 0.9vw;
  padding: 0.3vw;
  width: 15vw;
  right: 0;
  bottom: 0;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: #d3d3d3;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;

`;
export default Modal;
