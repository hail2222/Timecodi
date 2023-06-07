import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dates from './Dates';
import axios from 'axios';

function NonAdminBox (props) {
  const gid = props.gid;
  const isAdmin = props.isAdmin;

  const withdrawGroup = (gid) => {
    const data = { gid: gid };
    axios
      .delete(
        "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/member",
        {
          data: data,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        alert(response.data.msg);
      })
      .catch((err) => {
        alert("err!");
      });
  }

  if(!isAdmin){
    return (
    
    <div className="col-4 grid-margin stretch-card" style={{'padding':'0vw 0vw', 'margin':'1.0vw'}}>
    <div className="card row" style={{height: "250px"}}>
      <h4 className="card-title" style={{
          "margin":'2.5vw 0 0 2.5vw', 'color':'#FA5C7D' }}>
            <i class="mdi mdi-alert btn-icon-prepend"></i>&nbsp;Danger Zone </h4>
        <div className="card-body" >
        <p className="card-description" style={{"padding":'0.2vw 1vw 0vw 0',"text-align":'left'}}>I hope you know what you are doing.. 
        </p>
      <div style={{"margin":'2.5vw 0 0 3vw'}}>
      <button type="button" className="btn btn-outline-danger btn-rounded btn-sm" onClick={()=>withdrawGroup(gid)}>Withdraw from group</button>

      </div>
    </div>
    </div>
    </div>
    );
  }
  else{
    return null;
  }
};

// const Form = styled.div`
//   display: flex;
//   flex-flow: row wrap;
//   margin: 0 10px 0px 20px;
//   width: 38vw;

// `;

// const ViewWeek = styled.button`
//   position: relative;
//   padding: 0 0.0vw 0 0.7vw;
//   width: 0.5vw;
//   height: 5.0vw;
//   text-align: left;
//   border: 2px solid #fcd4ec;
//   border-radius: 2px;

//   list-style: none;
//   background:#ffe5ea;
//   cursor: pointer;

// `;

export default NonAdminBox;
