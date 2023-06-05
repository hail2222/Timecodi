import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Head = (props) => {
  const { year, month, goToday, setMonth } = props;

  return (
    <Form>
      <Nav>
        <div className="row">
        <Month>
            {MONTHS[(12000+month - 1)%12]}
          </Month>
          <Year>
            {(month+12000-1)%12+1} / {parseInt((year*12+month-1)/12)} 
          </Year>

          <BtnBox>
            <div className="row">

            </div>
            <div className="row">

              <Btn onClick={() => setMonth(month - 1)} >&lt;</Btn>
              <Btn width="4vw" onClick={() => goToday()}>TODAY</Btn>
              <Btn onClick={() => setMonth(month + 1)}>&gt;</Btn>
            </div>
          </BtnBox>
        </div>

      </Nav>
      <Days>
        {DAY.map((elm, idx) => {
          return <Day key={idx}>{elm}</Day>;
        })}
      </Days>
    </Form>
  );
};

const Form = styled.section`
  display: flex;
  flex-direction: column;
  width: 49vw;
  height: 9vw;
  border: 2px solid #e4e3e6;
  border-radius: 2px;
  margin: 20px 20px 0 20px;
`;
const Nav = styled.section`
  margin:.7vw;
`;
const Month = styled.div`
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  left: 4vw;
  top: 1.8vw;
`;
const Year = styled.div`
  font-size: 1.0rem;
  font-weight: 200;
  position: relative;
  left: 5vw;
  top: 2.6vw;
`;
const BtnBox = styled.div`
  margin: 0 1vw 0 0;
  width: 30vw;
  position: absolute;
  right: 0vw;
  left: 41vw;
  top: 4.5vw;

`;
const Btn = styled.li`
  padding: 0.2vw 0.2vw 0.2vw;
  width: ${(props) => {
    return props.width || '1.5vw';
  }};
  border: 0.5px solid #e4e3e6;
  border-radius: 5px;
  text-align: center;
  font-size: 0.8rem;
  cursor: pointer;
  position: relative;
  right: 0vw;
  list-style: none;

`;

const Days = styled.div`
  display: flex;
  margin: 3.3vw 0 0.3vw 0vw;
`;
const Day = styled.li`

  width: 7vw;
  text-align: center;
  list-style: none;

  :nth-child(7n + 1),
  :nth-child(7n) {
    color: #969696;
  }
`;

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const DAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export default Head;
