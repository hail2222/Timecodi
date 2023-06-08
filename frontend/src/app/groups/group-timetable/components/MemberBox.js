// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import Dates from './Dates';
// import { Link } from "react-router-dom/cjs/react-router-dom.min";

// import axios from 'axios';

// function MemberBox (props) {
//   const gid = props.gid;
//   const isAdmin = props.isAdmin;

//   const { totalDate, today, month, year } = props;

//   const [show, setShow] = useState(false);

//   // let members = ["David Grey","David Grey","David Grey", "Stella Johnson","Stella Johnson","Stella Johnson", "Marina Michel", "John Doe"];
//     // let [memberList] = useState(members);
//   let members = props.members;

//   const [addShow, setAddShow] = useState(false);
//   const addClose = () => setAddShow(!addShow);
//   const handleShow = () => setShow(true);

//   //today

//   const requestOptions = {
//     method: 'GET',
//     redirect: 'follow',
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Headers': 'Content-Type',
//       'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
//     },
//   };

//   const transferAdmin = (userId) => {
//     const data = { gid: gid, uid: userId };
//     axios
//       .put(
//         "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/admin", data,
//         {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         }
//       )
//       .then((response) => {
//         alert("transfer!")
//       })
//       .catch((err) => {
//         alert(err.response.data.detail);
//       });
//   }

//   const kickOut = (userId) => {
//     const data = { gid: gid, uid: userId };
//     axios
//       .delete(
//         "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/admin",
//         {
//           data: data,
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         }
//       )
//       .then((response) => {
//         alert("user kick out!")
//       })
//       .catch((err) => {
//         alert(err.response.data.detail);
//       });
//   }

//   const withdrawGroup = (gid) => {
//     alert("admin can't!");
//   }

//   const deleteGroup = (gid) => {
//     const data = { gid: gid };
//     axios
//       .delete(
//         "https://port-0-timecodi-416cq2mlg8dr0qo.sel3.cloudtype.app/group",
//         {
//           data: data,
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         }
//       )
//       .then((response) => {
//         alert(response.data.msg);
//       })
//       .catch((err) => {
//         alert("err!");
//       });
//   }

//   if(isAdmin){
//     return (
    
//       <div className="col-6 grid-margin stretch-card">
//       <div className="card">
//         <h4
//           className="card-title"
//           style={{
//             margin: "2.5vw 0 0 2.5vw",
//           }}
//         >
//           <i className="mdi mdi-account"></i> Members (Admin 계정)
//         </h4>

//         <div
//           className="card-body"
//           style={{
//             height: "200px",
//             overflowY: "auto",
//             overflowX: "hidden",
//           }}
//         >
//           {/* <p className="card-description">Click member's name</p> */}
//           <div className="table-responsive">
//           <table className="table">
              
//                 <tr style={{"text-align":'center'}}>
//                 <th style={{"width":'15vw'}}> Name </th>
//                   <th style={{"width":'20vw'}}> ID </th>
//                   <th style={{"width":'35vw'}}> Actions </th>
//                 </tr> 
              
//               <tbody>
//                 {members.map(function (el, idx) {
//                   return (
//                     <tr style={{"text-align":'center'}}>
//                       <td
//                         onClick={handleShow}
//                         style={{ cursor: "pointer" }}
//                       >
//                         {el.name}
//                       </td>
//                       <td
//                         onClick={handleShow}
//                         style={{ cursor: "pointer" }}
//                       >
//                         {el.id}
//                       </td>
//                       <td>
//                       <button type="button" className="btn btn-inverse-info btn-sm" style={{"height":'2vw'
//                             }}>
//                           <Link
//                             to={`/mypage/FriendTimetable/${el.gid}`}
                            
//                           >
//                             <i className="mdi mdi-calendar"></i>

//                           </Link>
//                         </button>
//                         <button
//                           type="button"
//                           className="btn btn-inverse-warning btn-sm" style={{"height":'2vw'
//                         }}
//                         >
//                           Friend +
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <center>
//           <button
//             type="button"
//             className="btn btn-gradient-primary btn-sm "
//             style={{ "font-weight": "420", margin: "2vw" }}
//             onClick={friendClose}
//           >
//             <i className="mdi mdi-account-plus"></i>
//             &nbsp;Invite New Member
//           </button>
//         </center>
//       </div>
//     </div>
//     );
//   }
//   else{
//     return(
//       <div className="col-6 grid-margin stretch-card">
//       <div className="card">
//         <h4
//           className="card-title"
//           style={{
//             margin: "2.5vw 0 0 2.5vw",
//           }}
//         >
//           <i className="mdi mdi-account"></i> Members (Admin 아닌계정)
//         </h4>

//         <div
//           className="card-body"
//           style={{
//             height: "200px",
//             overflowY: "auto",
//             overflowX: "hidden",
//           }}
//         >
//           {/* <p className="card-description">Click member's name</p> */}
//           <div className="table-responsive">
//             <table className="table">
              
//                 <tr style={{"text-align":'center'}}>
//                   <th style={{"width":'15vw'}}> Name </th>
//                   <th style={{"width":'20vw'}}> ID </th>
//                   <th style={{"width":'35vw'}}> Actions </th>
//                 </tr> 
              
//               <tbody>
//                 {members.map(function (el, idx) {
//                   return (
//                     <tr style={{"text-align":'center'}}>
//                       <td
//                         onClick={handleShow}
//                         style={{ cursor: "pointer" }}
//                       >
//                         {el.name}
//                       </td>
//                       <td
//                         onClick={handleShow}
//                         style={{ cursor: "pointer" }}
//                       >
//                         {el.id}
//                       </td>
//                       <td>
//                       <button type="button" className="btn btn-inverse-info btn-sm" style={{"height":'2vw'
//                             }}>
//                           <Link
//                             to={`/mypage/FriendTimetable/${el.gid}`}
                            
//                           >
//                             <i className="mdi mdi-calendar"></i>

//                           </Link>
//                         </button>
//                         <button
//                           type="button"
//                           className="btn btn-inverse-warning btn-sm" style={{"height":'2vw'
//                         }}
//                         >
//                           Friend +
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <center style={{"color":"gray", "padding-bottom":'2vw'}}>
          
//             <i className="mdi mdi-account-plus"></i>
//             &nbsp; To invite new member, ask the admin!
//         </center>
//       </div>
//     </div>


//     );
//   }
// };

// export default MemberBox;
