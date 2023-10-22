import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Dates from "./Dates";
import axios from "axios";
import apiurl from "./../../apiurl";

const sampleEvtList = [
  {
    visibility: "public",
    cid: 61234,
    edatetime: "2023-05-02T14:00:00",
    enddate: null,
    uid: "tester",
    cname: "my event test",
    sdatetime: "2023-05-01T14:00:00",
    weekly: "0",
  },
];

const Body = (props) => {
  const { totalDate, today, month, year, fid } = props;
  const lastDate = totalDate.indexOf(1);
  const firstDate = totalDate.indexOf(1, 7);
  const [evtList, setEvtList] = useState([]);
  let [evtMap, setEvtMap] = useState(new Map()); // key: date, value: event
  const [holiday, setHoliday] = useState([0]);

  //today
  const findToday = totalDate.indexOf(today);
  const getMonth = new Date().getMonth() + 1;
  const runAxios = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/?solYear=${year}&solMonth=${month}`,
        requestOptions
      );
      console.log(res.data);
      setHoliday(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setEvtList(sampleEvtList);
    fetchEvtList();
  }, []);

  const fetchEvtList = () => {
    axios
      .get(`${url}/friendcal?fid=${fid}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        let newEvtList = [];
        newEvtList.push(res.data);
        setEvtList(newEvtList[0]);
        console.log("Friends Cal", newEvtList[0]);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  const populateEvtMap = (evtList) => {
    const newEvtMap = new Map();

    evtList.forEach((evt) => {
      if (evt.sdatetime !== undefined && evt.edatetime !== undefined) {
        let sdate = evt.sdatetime.split("T")[0];
        let edate = evt.edatetime.split("T")[0];

        if (newEvtMap.has(sdate)) {
          newEvtMap.get(sdate).push(evt);
        } else {
          newEvtMap.set(sdate, [evt]);
        }

        if (sdate !== edate) {
          let currentDate = new Date(sdate);
          const lastDate = new Date(edate);

          while (currentDate <= lastDate) {
            let dateKey = currentDate.toISOString().split("T")[0];
            if (!newEvtMap.has(dateKey)) {
              newEvtMap.set(dateKey, [evt]);
            } else if (!newEvtMap.get(dateKey).some((e) => e.cid === evt.cid)) {
              newEvtMap.get(dateKey).push(evt);
            }
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
      }
    });
    setEvtMap(newEvtMap);
  };

  useEffect(() => {
    populateEvtMap(evtList);
  }, [evtList]);

  function getEvtFromMap(year, month, elm) {
    let evtList = [];
    const date = `${year}-${String(month).padStart(2, "0")}-${String(
      elm
    ).padStart(2, "0")}`;
    if (evtMap.has(date)) {
      evtList = evtMap.get(date);
    }
    return evtList;
  }

  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
  };

  useEffect(() => {
    runAxios();
  }, [month]);

  return (
    <Form>
      {totalDate.map((elm, idx) => {
        return (
          <Dates
            key={idx}
            idx={idx}
            lastDate={lastDate}
            firstDate={firstDate}
            elm={elm}
            findToday={findToday === idx && month === getMonth && findToday}
            month={month}
            year={year}
            holiday={holiday.item}
            evtList={getEvtFromMap(year, month, elm, evtMap)}
          ></Dates>
        );
      })}
    </Form>
  );
};

const Form = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 10px 20px 20px;
  width: 49vw;
`;
export default Body;
