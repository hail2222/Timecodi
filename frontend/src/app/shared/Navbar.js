import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Trans } from 'react-i18next';

function Navbar() {
  const history = useHistory();

  const toggleOffcanvas = () => {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  // const toggleRightSidebar = () => {
  //   document.querySelector('.right-sidebar').classList.toggle('open');
  // }

  const logoutHandler = () => {
    localStorage.removeItem("token");
    history.push("/user-pages/login-1");
  }

  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <Link className="navbar-brand brand-logo" to="/dashboard"><h3><i className="mdi mdi-timetable mr-1"/>TimeCodi</h3></Link>
        <Link className="navbar-brand brand-logo-mini" to="/dashboard"><img src={require('../../assets/images/logo-mini.svg')} alt="logo" /></Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
          <span className="mdi mdi-menu"></span>
        </button>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-logout d-none d-lg-block">
            <div className="nav-link" onClick={logoutHandler}>
              <i className="mdi mdi-power"></i>
            </div>
          </li>
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
