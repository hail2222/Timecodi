import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimetableHeader = (props) => {
  const {
    startDate,
    endDate,
    dayofWeek,
    
  } = props;



  return (
    <Form>
      <Slot></Slot>
      <Header>8:00</Header>
      <Header>9:00</Header>
      <Header>10:00</Header>
      <Header>11:00</Header>
      <Header>12:00</Header>
      <Header>1:00</Header>
      <Header>2:00</Header>
      <Header>3:00</Header>
      <Header>4:00</Header>
      <Header>5:00</Header>
      <Header>6:00</Header>
      <Header>7:00</Header>
      <Header>8:00</Header>
      <Header>9:00</Header>
      <Header>10:00</Header>
      <Header>11:00</Header>
      <Header>12:00</Header>
      <Header>1:00</Header>
      <Header>2:00</Header>




    </Form>
  );
};
const Form=styled.div`
    display:flex;
  flex-direction:column;

`;
const Slot = styled.div`
  position: relative;
  width: 43px;
  height: 6px;
  z-index: 999;
`;
const Header = styled.div`
  position: relative;
  width: 86px;
  height: 23px;
  font-size: 13px;
  padding-right:4px;
  text-align: right;
  color: gray;
  z-index: 999;
`;

export default TimetableHeader;
