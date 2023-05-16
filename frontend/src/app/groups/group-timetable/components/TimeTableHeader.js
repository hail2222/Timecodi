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
  width: 3vw;
  height: 0.4vw;
  z-index: 999;
`;
const Header = styled.div`
  position: relative;
  width: 6vw;
  height: 1.6vw;
  font-size: 0.9vw;
  padding-right:0.3vw;
  text-align: right;
  color: gray;
  z-index: 999;
`;

export default TimetableHeader;
