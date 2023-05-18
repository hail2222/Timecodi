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
  height: 432px;
  border-radius: 10px;
  text-align: left;
  color: black;
  z-index: 990;
`;
const HeaderForm = styled.li`
  display:flex;
  flex-direction:row;
  margin-top:14px;
  padding: 0px 0 0px 86px ;
  position: relative;
  list-style: none;
  height: 14px;
  text-align: center;

  z-index: 990;
`;

const Header = styled.div`
  position: relative;
  width: 58px;
  height: 14px;

  text-align: center;
  color: black;
  z-index: 990;
`;


export default TimeTable;
