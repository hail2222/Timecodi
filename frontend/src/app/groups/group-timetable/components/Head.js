import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Head = (props) => {
  const { year, month, goToday, setMonth } = props;

  return (
    <Form>
      <Nav>
        <div className="row">
          <Month>
            {MONTHS[month - 1]}
          </Month>
          <Year>
            {month} / {year} 
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
  width: 511px;
  height: 101px;
  border: 2px solid #e4e3e6;
  border-radius: 2px;
  margin: 10px 0px 0 7px;
`;
const Nav = styled.section`
  margin:10px;
`;
const Month = styled.div`
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  left: 58px;
  top: 12px;
`;
const Year = styled.div`
  font-size: 1.0rem;
  font-weight: 200;
  position: relative;
  left: 72px;
  top: 22px;
`;
const BtnBox = styled.div`
  margin: 22px 14px 0 0;
  width: 144px;
  position: relative;
  right: 0px;
  left: 288px;


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
  margin: 0.8em 0 4px 0px;
  position: relative;
`;
const Day = styled.li`

  width: 72px;
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
