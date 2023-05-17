import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dates from './Dates';
import axios from 'axios';

function AdminBox (props) {
  const { totalDate, today, month, year } = props;

  const [show, setShow] = useState(false);

  let members = ["David Grey","David Grey","David Grey", "Stella Johnson","Stella Johnson","Stella Johnson", "Marina Michel", "John Doe"];
  let [memberList] = useState(members);
  const [addShow, setAddShow] = useState(false);
  const addClose = () => setAddShow(!addShow);
  const handleShow = () => setShow(true);

  //today

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
  };


  return (
    
    <div className="col-12 grid-margin stretch-card" style={{'padding':'0vw 0vw', 'margin':'1.3vw'}}>
    <div className="card row" style={{
          height: "500px",

        }}>
    <div className="col-md-6" >
        <h4 className="card-title" style={{
          "margin":'2.5vw 0 0 2.5vw',
        }}>
          <i className="mdi mdi-settings"></i> &nbsp;Admin
        </h4>
        
        <div className="card-body" style={{
          height: "400px",
          overflowY: "auto",
          overflowX: "hidden",
        }}>
          {/* <p className="card-description">Click member's name</p> */}
        <div className="table-responsive" >
          <table className="table">
            <thead>
              {/* <tr style={{"text-align":'center'}}>
                <th> Name </th>
                <th> Actions </th>
              </tr> */}
              
            </thead>
            <tbody>
              {memberList.map(function (el, idx) {
                return (
                  <tr>
                    <td
                      onClick={handleShow}
                      style={{ cursor: "pointer" }}
                    >
                      {el}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-inverse-info btn-sm"
                      >
                        Transfer Admin
                      </button>
                      <button
                        type="button"
                        className="btn btn-inverse-danger btn-sm"
                      >
                        Kick out
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </div>

      </div>
      <div className="col-md-6" >
      <h4 className="card-title" style={{
          "margin":'2.5vw 0 0 2.5vw', 'color':'#FA5C7D' }}>
            <i class="mdi mdi-alert btn-icon-prepend"></i>&nbsp;Danger Zone </h4>
        <div className="card-body" >
        <p className="card-description" style={{"padding":'0.2vw 1vw 0vw 0',"text-align":'left'}}>I hope you know what you are doing.. 
        Next actions are irreversible.<br></br>If you leave the group without transferring the Admin to another member, 
        the member who joined the group first among the remaining people will gain the Admin's authority.</p>
        <div style={{"margin":'0 5vw'}}>
      <button type="button" className="btn btn-outline-danger btn-rounded btn-sm">Withdraw from group</button>
      <button type="button" className="btn btn-outline-danger btn-rounded btn-sm">Delete group</button>
      </div>
</div>
      </div>


    </div>
  </div>
  );
};

const Form = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 10px 0px 20px;
  width: 38vw;

`;

const ViewWeek = styled.button`
  position: relative;
  padding: 0 0.0vw 0 0.7vw;
  width: 0.5vw;
  height: 5.0vw;
  text-align: left;
  border: 2px solid #fcd4ec;
  border-radius: 2px;

  list-style: none;
  background:#ffe5ea;
  cursor: pointer;

`;

export default AdminBox;
