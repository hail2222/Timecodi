import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Timeslot from "./Timeslot";
import TimetableHeader from "./TimeTableHeader";


const TimeTable = (props) => {
  const {
    startDate,
    endDate,
    
  } = props;



  return (
    <div>
    <HeaderForm>
      <Header>SUN</Header>
      <Header>MON</Header>
      <Header>TUE</Header>
      <Header>WED</Header>
      <Header>THU</Header>
      <Header>FRI</Header>
      <Header>SAT</Header>
    </HeaderForm>
    <Form>
      <TimetableHeader></TimetableHeader>
      <Timeslot></Timeslot>
      <Timeslot></Timeslot>
      <Timeslot></Timeslot>
      <Timeslot></Timeslot>
      <Timeslot></Timeslot>
      <Timeslot></Timeslot>
      <Timeslot></Timeslot>
    </Form>
  </div>  
  );
};

const Form = styled.li`
  display:flex;
  flex-direction:row;
  position: relative;
  list-style: none;
  height: 30vw;
  border-radius: 10px;
  text-align: left;
  color: black;
  z-index: 999;
`;
const HeaderForm = styled.li`
  display:flex;
  flex-direction:row;
  margin-top:1vw;
  padding: 0vw 0 0vw 6vw ;
  position: relative;
  list-style: none;
  height: 1vw;
  text-align: center;

  z-index: 999;
`;

const Header = styled.div`
  position: relative;
  width: 4vw;
  height: 1.0vw;

  text-align: center;
  color: black;
  z-index: 999;
`;


export default TimeTable;
