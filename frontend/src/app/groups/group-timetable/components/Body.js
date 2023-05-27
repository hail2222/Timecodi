import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dates from './Dates';
import axios from 'axios';

function Body(props) {
  const { totalDate, today, month, year } = props;
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
  let viewButtons6 = [1, 2, 3, 4, 5,6];

  const [viewWeekActive, setViewWeekActive] = useState("unactive");


  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
  };

  useEffect(() => {
    runAxios();
  }, [month]);

  return (
    <>
      <Form>
        {totalDate.map((elm, idx) => {

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
                    findToday={findToday === idx && month === getMonth && findToday}
                    month={month}
                    year={year}
                    holiday={holiday.item}
                  ></Dates>

                </div>

              ) : (<Dates
                key={idx}
                idx={idx}
                lastDate={lastDate}
                firstDate={firstDate}
                elm={elm}
                findToday={findToday === idx && month === getMonth && findToday}
                month={month}
                year={year}
                holiday={holiday.item}
              ></Dates>)}
            </div>



          );
        })}

      </Form>
      <Form2>
        <>
          {
            Math.ceil(totalDate.length/7)===5
            ? viewButtons5.map((item, idx) => {
              return (
                <>
                  <ViewWeek value={idx} className={idx == viewWeekActive ? "active" : "unactive"} onClick={e => setViewWeekActive(e.target.value)}></ViewWeek>
                </>
              );
            })
            :(
              viewButtons6.map((item, idx) => {
                return (
                  <>
                    <ViewWeek value={idx} className={idx == viewWeekActive ? "active" : "unactive"} onClick={e => setViewWeekActive(e.target.value)}></ViewWeek>
                  </>
                );
              })

            )
          }


        </>
      </Form2>
    </>
  );
};

const Form = styled.div`
  position:absolute;

  display: flex;
  flex-flow: row wrap;
  margin: 0 0 0 0.4em;
  width: 32em;

`;
const Form2 = styled.div`
  position:absolute;
  display: flex;
  flex-flow: row wrap;;
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
  background:#ffe5ea;
  z-index: 999;
  cursor: pointer;

  &:hover{
    background: #fea3b6;
    border: 2px solid #fea3b6;
  }
  &.active{
    background: #fea3b6;
    border: 2px solid #fea3b6;

  }
`;

export default Body;
