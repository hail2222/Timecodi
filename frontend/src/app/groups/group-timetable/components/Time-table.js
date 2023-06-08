import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import styled from "styled-components";
import Timeslot from "./Timeslot";
import TimetableHeader from "./TimeTableHeader";
import GroupCalContext from "./../../GroupCalContext";

const TimeTable = (props) => {
  const { startDate, endDate } = props;
  const { groupCal } = useContext(GroupCalContext);

  const iter_for_timeslot = useCallback((list, className) => {
    let slots = {
      sundayList: [],
      mondayList: [],
      tuesdayList: [],
      wednesdayList: [],
      thursdayList: [],
      fridayList: [],
      saturdayList: [],
    };
    list.forEach((element) => {
      let dayOfWeek = element[1];
      let [hour, minute] = element[2].split(":").map(Number);
      let time = (hour + minute / 60).toFixed(1); // 08:30:00 to 8.5
      let timeSlot = { time: time.toString(), className: className };

      if (dayOfWeek === "Sunday") {
        slots.sundayList.push(timeSlot);
      } else if (dayOfWeek === "Monday") {
        slots.mondayList.push(timeSlot);
      } else if (dayOfWeek === "Tuesday") {
        slots.tuesdayList.push(timeSlot);
      } else if (dayOfWeek === "Wednesday") {
        slots.wednesdayList.push(timeSlot);
      } else if (dayOfWeek === "Thursday") {
        slots.thursdayList.push(timeSlot);
      } else if (dayOfWeek === "Friday") {
        slots.fridayList.push(timeSlot);
      } else if (dayOfWeek === "Saturday") {
        slots.saturdayList.push(timeSlot);
      }
    }); // for loop
    return slots;
  }, []);

  const {
    sundayList,
    mondayList,
    tuesdayList,
    wednesdayList,
    thursdayList,
    fridayList,
    saturdayList,
  } = useMemo(() => {
    let slots = {
      sundayList: [],
      mondayList: [],
      tuesdayList: [],
      wednesdayList: [],
      thursdayList: [],
      fridayList: [],
      saturdayList: [],
    };
    if (groupCal) {
      const groupCal_dict = groupCal[0];
      const first_list = groupCal_dict["first_list"];
      const first_key = Object.keys(first_list)[0]; // 1st list's possible number of people
      const first_value = first_list[first_key]; // 1st list's available times: 2023-05-01 Monday 08:00:00
      const first_slots = iter_for_timeslot(first_value, "avail-first");

      const second_list = groupCal_dict["second_list"];
      const second_key = Object.keys(second_list)[0]; // 2nd list's possible number of people
      const second_value = second_list[second_key]; // 2nd list's available times: 2023-05-01 Monday 08:00:00
      const second_slots = iter_for_timeslot(second_value, "avail-second");

      const third_list = groupCal_dict["third_list"];
      const third_key = Object.keys(third_list)[0]; // 3rd list's possible number of people
      const third_value = third_list[third_key]; // 3rd list's available times: 2023-05-01 Monday 08:00:00
      const third_slots = iter_for_timeslot(third_value, "avail-third");

      for (let dayOfWeek in slots) {
        slots[dayOfWeek] = [
          ...first_slots[dayOfWeek],
          ...second_slots[dayOfWeek],
          ...third_slots[dayOfWeek],
        ];
      }
    }
    return slots;
  }, [groupCal, iter_for_timeslot]);

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
        <Timeslot list_for_timeslot={sundayList}></Timeslot>
        <Timeslot list_for_timeslot={mondayList}></Timeslot>
        <Timeslot list_for_timeslot={tuesdayList}></Timeslot>
        <Timeslot list_for_timeslot={wednesdayList}></Timeslot>
        <Timeslot list_for_timeslot={thursdayList}></Timeslot>
        <Timeslot list_for_timeslot={fridayList}></Timeslot>
        <Timeslot list_for_timeslot={saturdayList}></Timeslot>
      </Form>
    </div>
  );
};

const Form = styled.li`
  display: flex;
  flex-direction: row;
  position: relative;
  list-style: none;
  height: 432px;
  border-radius: 10px;
  text-align: left;
  color: black;
  z-index: 990;
`;
const HeaderForm = styled.li`
  display: flex;
  flex-direction: row;
  margin-top: 14px;
  padding: 0px 0 0px 67px;
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

/* 
[
    {'first_list': 
        {4: 
            (
                ('2023-05-01', 'Monday', '08:00:00'), 
*/
