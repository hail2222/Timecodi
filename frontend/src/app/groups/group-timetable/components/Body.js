import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Dates from "./Dates";
import axios from "axios";
import url from "./../../../apiurl";

function Body(props) {
  const {
    totalDate,
    today,
    month,
    year,
    gid,
    groupCal,
    fetchGroupCal,
    meetingList,
  } = props;
  const lastDate = totalDate.indexOf(1);
  const firstDate = totalDate.indexOf(1, 7);

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
  let viewButtons5 = [1, 2, 3, 4, 5];
  let viewButtons6 = [1, 2, 3, 4, 5, 6];
  let lastDatesOfWeek = [];

  let [meetingMap, setMeetingMap] = useState(new Map()); // key: date, value: meetingInfo
  const populateEvtMap = (meetingList) => {
    const newEvtMap = new Map();

    meetingList.forEach((evt) => {
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
    setMeetingMap(newEvtMap);
    console.log(meetingMap);
  };

  useEffect(() => {
    populateEvtMap(meetingList);
  }, [meetingList]);

  function getEvtFromMap(year, month, elm) {
    let evtList = [];
    const date = `${year}-${String(month).padStart(2, "0")}-${String(
      elm
    ).padStart(2, "0")}`;
    if (meetingMap.has(date)) {
      evtList = meetingMap.get(date);
    }
    return evtList;
  }

  const [viewWeekActive, setViewWeekActive] = useState("unactive");
  const [groupWeeklyCal, setGroupWeeklyCal] = useState([]);
  const handleViewWeek = (idx) => {
    setViewWeekActive(idx);
    console.log(`ViewWeek ${idx} clicked`);
    console.log(lastDatesOfWeek[idx]);

    // form of 2023-01-01
    let year = lastDatesOfWeek[idx].year;
    let month = lastDatesOfWeek[idx].month;
    let date = lastDatesOfWeek[idx].date;
    if (date < 7 && idx > 3) {
      month += 1;
    }
    let enddate = `${year}-${month < 10 ? `0${month}` : month}-${
      date < 10 ? `0${date}` : date
    }`;
    console.log(enddate);

    // startdate is 6 days before enddate
    let startdate = new Date(enddate);
    startdate.setDate(startdate.getDate() - 6);
    startdate = `${startdate.getFullYear()}-${
      startdate.getMonth() + 1 < 10
        ? `0${startdate.getMonth() + 1}`
        : startdate.getMonth() + 1
    }-${
      startdate.getDate() < 10 ? `0${startdate.getDate()}` : startdate.getDate()
    }`;
    console.log(startdate);

    // get weekly group calendar
    axios
      .get(
        `${url}/weeklygroupcal?gid=${gid}&start_date=${startdate}&end_date=${enddate}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        let newList = [];
        newList.push(res.data);
        setGroupWeeklyCal(newList[0]);
        localStorage.setItem("groupWeeklyCal", JSON.stringify(newList[0]));
        fetchGroupCal();
      })
      .catch((err) => {
        console.log("get group weekly calender");
        console.log(err);
      });
  };

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
    <>
      <Form>
        {totalDate.map((elm, idx) => {
          if (idx % 7 == 6) {
            // 이 인덱스 = viewWeek 버튼의 인덱스 = lastDatesOfWeek 배열의 인덱스
            let last = { idx: idx, year: year, month: month, date: elm };
            lastDatesOfWeek.push(last);
          }
          return (
            <div>
              {idx % 7 == 6 ? (
                <div className="row" style={{ margin: "0 0 0 0" }}>
                  <Dates
                    key={idx}
                    idx={idx}
                    lastDate={lastDate}
                    firstDate={firstDate}
                    elm={elm}
                    findToday={
                      findToday === idx && month === getMonth && findToday
                    }
                    month={month}
                    year={year}
                    holiday={holiday.item}
                  ></Dates>
                </div>
              ) : (
                <Dates
                  key={idx}
                  idx={idx}
                  lastDate={lastDate}
                  firstDate={firstDate}
                  elm={elm}
                  findToday={
                    findToday === idx && month === getMonth && findToday
                  }
                  month={month}
                  year={year}
                  holiday={holiday.item}
                  meetingInfo={getEvtFromMap(year, month, elm)}
                ></Dates>
              )}
            </div>
          );
        })}
      </Form>
      <Form2>
        <>
          {Math.ceil(totalDate.length / 7) === 5
            ? viewButtons5.map((item, idx) => {
                return (
                  <>
                    <ViewWeek
                      value={idx}
                      className={idx == viewWeekActive ? "active" : "unactive"}
                      onClick={() => handleViewWeek(idx)}
                    ></ViewWeek>
                  </>
                );
              })
            : viewButtons6.map((item, idx) => {
                return (
                  <>
                    <ViewWeek
                      value={idx}
                      className={idx == viewWeekActive ? "active" : "unactive"}
                      onClick={() => handleViewWeek(idx)}
                    ></ViewWeek>
                  </>
                );
              })}
        </>
      </Form2>
    </>
  );
}

const Form = styled.div`
  position: absolute;

  display: flex;
  flex-flow: row wrap;
  margin: 0 0 0 0.4em;
  width: 32em;
`;
const Form2 = styled.div`
  position: absolute;
  display: flex;
  flex-flow: row wrap;
  width: 1em;
  margin-left: 31.5em;
`;

const ViewWeek = styled.button`
  position: relative;
  padding: 0 0px 0 10px;
  width: 7px;
  height: 72px;
  text-align: left;
  border: 2px solid #fcd4ec;
  border-radius: 2px;
  list-style: none;
  background: #ffe5ea;
  z-index: 999;
  cursor: pointer;

  &:hover {
    background: #fea3b6;
    border: 2px solid #fea3b6;
  }
  &.active {
    background: #fea3b6;
    border: 2px solid #fea3b6;
  }
`;

export default Body;
