import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import {Bar, Doughnut} from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import howto from './howto.png';
// import "react-datepicker/dist/react-datepicker.css";



export class Dashboard extends Component {

  render () {
    return (
      <img src={howto} alt="" className="col-12"></img>

    );
  }
}

export default Dashboard;