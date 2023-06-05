import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Timeslot = (props) => {
  const { list_for_timeslot } = props; // [{time: 8.0, className: avail-first}, ... ]
  const [slots, setSlots] = useState(
    Array.from({ length: 36 }, (_, i) => ({
      time: (8 + i * 0.5).toFixed(1),
      className: "",
    }))
  );

  useEffect(() => {
    // Update with classes from list_for_timeslot
    if (list_for_timeslot) {
      const updatedSlots = slots.map((slot) => {
        const match = list_for_timeslot.find((s) => s.time === slot.time);
        return match || slot;
      });
      setSlots(updatedSlots);
    }
  }, [list_for_timeslot]);

  return (
    <Form>
      <EmptySlot />
      {slots.map((elm, index) => {
        const SlotComponent = index % 2 === 0 ? Slot : Slot2;
        return (
          <SlotComponent
            key={elm.time}
            id={elm.time}
            className={elm.className}
          ></SlotComponent>
        );
      })}
    </Form>
  );
};

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;
const Slot = styled.div`
  position: relative;
  width: 58px;
  height: 12px;
  border: 1px solid #bb7aff;
  border-bottom: 1px dotted #bb7aff;
  text-align: left;
  z-index: 999;
  background-color: #f8f8f8;
  &.avail-first {
    background-color: #cc9fff;
  }
  &.avail-second {
    background-color: #e0c5ff;
  }
  &.avail-third {
    background-color: #f0e2ff;
  }
`;
const Slot2 = styled.div`
  position: relative;
  width: 58px;
  height: 12px;
  border: 1px solid #bb7aff;
  border-top: none;
  text-align: left;
  color: black;
  z-index: 999;
  background-color: #f8f8f8;
  &.avail-first {
    background-color: #cc9fff;
  }
  &.avail-second {
    background-color: #e0c5ff;
  }
  &.avail-third {
    background-color: #f0e2ff;
  }
`;
const EmptySlot = styled.div`
  position: relative;
  width: 43px;
  height: 14px;
  z-index: 999;
`;

export default Timeslot;

/* 
<Slot id="8.0"></Slot>
      <Slot2 id="8.5"></Slot2>
      <Slot id="9.0"></Slot>
      <Slot2 id="9.5"></Slot2>
      <Slot id="10.0"></Slot>
      <Slot2 id="10.5"></Slot2>
      <Slot id="11.0"></Slot>
      <Slot2 id="11.5"></Slot2>
      <Slot id="12.0"></Slot>
      <Slot2 id="12.5"></Slot2>
      <Slot id="13.0"></Slot>
      <Slot2 id="13.5"></Slot2>
      <Slot id="14.0"></Slot>
      <Slot2 id="14.5"></Slot2>
      <Slot id="15.0"></Slot>
      <Slot2 id="15.5"></Slot2>
      <Slot id="16.0"></Slot>
      <Slot2 id="16.5"></Slot2>
      <Slot id="17.0"></Slot>
      <Slot2 id="17.5"></Slot2>
      <Slot id="18.0"></Slot>
      <Slot2 id="18.5" className="avail-first"></Slot2>
      <Slot id="19.0" className="avail-first"></Slot>
      <Slot2 id="19.5" className="avail-first"></Slot2>
      <Slot id="20.0" className="avail-second"></Slot>
      <Slot2 id="20.5" className="avail-second"></Slot2>
      <Slot id="21.0" className="avail-second"></Slot>
      <Slot2 id="21.5" className="avail-second"></Slot2>
      <Slot id="22.0" className="avail-third"></Slot>
      <Slot2 id="22.5" className="avail-third"></Slot2>
      <Slot id="23.0" className="avail-third"></Slot>
      <Slot2 id="23.5" className="avail-third"></Slot2>
      <Slot id="24.0"></Slot>
      <Slot2 id="24.5"></Slot2>
      <Slot id="25.0"></Slot>
      <Slot2 id="25.5"></Slot2>
*/
