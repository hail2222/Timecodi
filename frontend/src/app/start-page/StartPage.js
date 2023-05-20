import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CheckText from './CheckText'

export class StartPage extends Component {
  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-5 py-5">
            <div className="col-sm-12 text-center grid-margin">
              <h1>
                <i className="mdi mdi-chart-bubble text-primary"/> Welcome to TimeCodi ! <i className="mdi mdi-chart-bubble text-primary"/>
              </h1>
            </div>

            <div className="col-lg-7 grid-margin stretch-card mx-auto">
              <div className="card">
                <div className="card-body">
                  <h3 className="mb-3">
                    <i className="mdi mdi-bookmark-outline text-primary"/> What is TimeCodi ?
                  </h3>
                  <p className="card-description">It is a service that allows you to coordinate time with others.</p>
                  <div>
                    <CheckText text=" You can set your timetable." />
                    <CheckText text=" You can make a meeting with other people based on your group timetable." />
                    <CheckText text=" You can check your friends' timetable." />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 grid-margin stretch-card mx-auto">
              <div className="card">
                <div className="card-body">
                  <div className="text-center mb-4">
                    <h3>Do you want to use it?</h3>
                  </div>
                  <div className="text-center">
                    <Link className="btn btn-rounded btn-outline-primary font-weight-medium btn-fw mt-3 btn-margin" to="/user-pages/login">Login</Link>
                    <Link className="btn btn-rounded btn-outline-primary font-weight-medium btn-fw mt-3 btn-margin" to="/user-pages/register">Register</Link>
                  </div>
                </div>
              </div>
            </div>

          <div className="col-lg-12 grid-margin stretch-card mx-auto">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <i className="mdi mdi-bookmark-outline text-primary"/> Personal Timetable
                </h4>
                <p className="card-description">You can set your timetable and add a schedule.</p>
                <div>
                  <CheckText text=" Google Calendar 연동" />
                  <CheckText text=" Google Calendar에 schedule 추가 가능" />
                  <CheckText text=" 이미지와 함께 추가 예정" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 grid-margin stretch-card mx-auto">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <i className="mdi mdi-bookmark-outline text-primary"/> Group Timetable
                </h4>
                <p className="card-description">You can check the group schedule and set the meeting time based on the members' timetable.</p>
                <div>
                  <CheckText text=" 그룹 만들기 및 멤버 초대" />
                  <CheckText text=" 멤버들의 가능한 시간대 표시" />
                  <CheckText text=" 가능한 시간대 중 미팅 시간 투표" />
                  <CheckText text=" 투표 결과 그룹 캘린더에 반영 ?" />

                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 grid-margin stretch-card mx-auto">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <i className="mdi mdi-bookmark-outline text-primary"/> Friend's Timetable
                </h4>
                <p className="card-description">You can add your friend and check your friends' timetable.</p>
                <div>
                  <CheckText text=" Search for and add your friend ID" />
                  <CheckText text=" Check your friend's timetable" />
                  <CheckText text=" Delete friends" />

                </div>
              </div>
            </div>
          </div>

          </div>

        </div>
      </div>
    )
  }
}

export default StartPage
