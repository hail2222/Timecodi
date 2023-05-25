import React from "react";
import CheckText from "./CheckText";
import StartHeader from "./StartHeader";
import "./startPage.css";

function StartPage() {
  return (
    <div>
      <StartHeader />

      <div className="d-flex align-items-center auth px-0">
        <div className="w-100">
          <div className="col-lg-12 stretch-card mx-0 px-0">
            <div className="border-radius-none card">
              <div className="card-body text-center mt-5">
                <h1 className="my-3">
                  Time Coordination with Others
                </h1>
                <h3 className="mb-3">
                  quickly and easily
                </h3>
                <div>
                  이미지 수정 예정
                  <img src="img/personal_calendar.png" alt="" className="col-5"></img>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="p-4 col-3 d-flex align-items-center">
              <div className="card-body">
                <h2 className="card-title">
                  Set Personal Timetable
                </h2>
                <div className="">
                  <CheckText text=" Works with Google Calendar" />
                  <CheckText text=" Add schedule to timetable" />
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="card-body text-center">
                <img src="img/personal_calendar.png" alt="" className="col-12"></img>
              </div>
            </div>
          </div>

          <div className="row justify-content-center bg-white">
            <div className="p-4 col-5">
              <div className="card-body">
                <img src="img/personal_calendar.png" alt="" className="col-12"></img>
              </div>
            </div>
            <div className="p-4 col-3 d-flex align-items-center">
              <div className="card-body">
                <h2 className="card-title">
                  Make Group Meeting
                </h2>
                <div>
                  <CheckText text=" Create group and Invite members" />
                  <CheckText text=" Automatically create a group timetable" />
                  <CheckText text=" Vote on the meeting time" />
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="p-4 col-3 d-flex align-items-center">
              <div className="card-body">
                <h2 className="card-title">
                  Find Your Friends
                </h2>
                <div>
                  <CheckText text=" Search for and add your friend" />
                  <CheckText text=" Check your friend's timetable" />
                </div>
              </div>
            </div>
            <div className="p-4 col-5">
              <div className="card-body text-center">
                <img src="img/personal_calendar.png" alt="" className="col-12"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
