import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { Form, FormControl } from 'react-bootstrap';

// import "react-datepicker/dist/react-datepicker.css";
//달력 추가
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Theme from './styles/Theme';
import Main from './Main';


export class Dashboard extends Component {
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(),
      visitSaleData: {},

    }
  }



  render() {
    return (
      <div>

        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-timetable"></i>
            </span> User Schedule </h3>

        </div>

        <div className="row">
          <div className="col-lg-12 " >
            <div className="card">
              <div className="card-body p-0 d-flex" >
                <div>
                  <Main style={{ flexDirection: 'column' }} />
                </div>
                <div className="col-sm-7 col-md-5 col-lg-4 stretch-card">

                  <div className="card ">
                    {/* <h3 className="card-title">Add Event</h3> */}
                    <br></br><br></br>
                    <center><h2>Add Event</h2></center>
                    <br></br><br></br>
                    {/* <p className="card-description"> Enter your schedule. </p> */}


                    <label>Event Name: </label>

                    <Form.Control type="text" id="event_content"></Form.Control> <br></br>
                    <label>Visibility:</label>
                    <select className="form-control" id="event_visibility">
                      <option value="default">default</option>
                      <option value="public">public</option>
                      <option value="private">private</option>
                    </select> <br></br>
                    <label>Start Date: </label>
                    <Form.Control type="datetime-local" id="event_sdue" value="start"></Form.Control> <br></br>

                    <label>End Date:</label>
                    <Form.Control type="datetime-local" id="event_edue"></Form.Control> <br></br>

                    <label>Repeat:</label>
                    <select className="form-control" id="event_repeat">
                      <option value="none">none</option>
                      <option value="daily">daily</option>
                      <option value="weekly">weekly</option>
                      <option value="monthly">monthly</option>
                    </select><br></br>
                    <label>Repeat End Date: </label>
                    <Form.Control type="date" id="event_done"></Form.Control><br></br><br></br>
                    <center>
                      <button type="submit" className="btn btn-gradient-primary mr-2" id="event_submit" >Submit</button>
                      <button className="btn btn-light">Cancel</button>
                      <br></br><br></br><br></br>
                      <p className="card-description"> or <br></br> Fetch schedule via Google Calendar </p>

                      <button type="button" className="btn btn-gradient-danger btn-fw">
                        <i className="mdi mdi-upload btn-icon-prepend"></i>
                        {/* <i className="mdi mdi-google"></i> */}
                        &nbsp;Upload Google Calendar
                      </button>
                    </center>
                    <br></br>
                    <br></br>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    );
  }
}


export default Dashboard;
