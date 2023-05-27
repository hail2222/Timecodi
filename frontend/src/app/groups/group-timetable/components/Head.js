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
  width: 32em;
  height: 6.5em;
  border: 0.1em solid #e4e3e6;
  border-radius: 0.2em;
  margin: 0.5em 0 0 0.4em;
`;
const Nav = styled.section`
  margin:0.65em;
`;
const Month = styled.div`
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  left: 1.8em;
  top: 0.4em;
`;
const Year = styled.div`
  font-size: 1.0rem;
  font-weight: 200;
  position: relative;
  left: 4em;
  top: 1.5em;
`;
const BtnBox = styled.div`
  margin: 1.5em 0 0 0.5em;
  position: absolute;
  right: 5em;


`;
const Btn = styled.li`
  padding: 3px 3px 3px;
  width: ${(props) => {
    return props.width || '22px';
  }};
  border: 0.5px solid #e4e3e6;
  border-radius: 5px;
  text-align: center;
  font-size: 0.8rem;
  cursor: pointer;
  position: relative;
  right: 0px;
  list-style: none;

`;

const Days = styled.div`
  display: flex;
  margin: 1em 0 0.2em ;
  position: relative;
`;
const Day = styled.li`

  width: 4.5em;
  text-align: center;
  list-style: none;
  position: relative;

  :nth-child(7n + 1),
  :nth-child(7n) {
    color: #969696;
  }
`;

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const DAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export default Head;
