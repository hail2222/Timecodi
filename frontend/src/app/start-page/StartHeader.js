import React, { Component } from "react";
import { Link } from "react-router-dom";

function StartHeader() {
  return (
    <nav className="justify-content-center navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">      
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo" to="/">
            <h3 className="text-primary my-0">
             <i className="mdi mdi-timetable mr-1" />
              TimeCodi
           </h3>
         </Link>
        </div>

        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-logout d-lg-block">
            <div className="btn-group" role="group" aria-label="Basic example">
              <Link className="btn btn-outline-primary font-weight-medium btn-margin" to="/user-pages/login">Login</Link>
              <Link className="btn btn-outline-primary font-weight-medium btn-margin" to="/user-pages/register">Register</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default StartHeader;
