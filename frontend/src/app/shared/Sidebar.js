import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { Trans } from "react-i18next";
import Withdrawal from "./Withdrawal";

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/groups", state: "groupsMenuOpen" },
      { path: "/advanced-ui", state: "advancedUiMenuOpen" },
      { path: "/form-elements", state: "formElementsMenuOpen" },
      { path: "/tables", state: "tablesMenuOpen" },
      { path: "/maps", state: "mapsMenuOpen" },
      { path: "/icons", state: "iconsMenuOpen" },
      { path: "/mypage", state: "chartsMenuOpen" },
      { path: "/user-pages", state: "userPagesMenuOpen" },
      { path: "/error-pages", state: "errorPagesMenuOpen" },
      { path: "/general-pages", state: "generalPagesMenuOpen" },
      { path: "/ecommerce", state: "ecommercePagesMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a
              href="!#"
              className="nav-link"
              onClick={(evt) => evt.preventDefault()}
            >
              <div className="nav-profile-image">
                <img
                  src={require("../../assets/images/faces/face1.jpg")}
                  alt="profile"
                />
                <span className="login-status online"></span>{" "}
                {/* change to offline or busy as needed */}
              </div>
              <div className="nav-profile-text">
                <span className="font-weight-bold mb-2">
                  <Trans>{localStorage.getItem("username")}</Trans>
                </span>
                <span className="text-secondary text-small">
                  <Trans>Project Manager</Trans>
                </span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a>
          </li>

          <li className={this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title">
                <Trans>Dashboard</Trans>
              </span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>

          <li className={this.isPathActive('/charts') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.chartsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('chartsMenuOpen')} data-toggle="collapse">
              <span className="menu-title">
                <Trans>My Page</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-calendar-check menu-icon"></i>
            </div>
            <Collapse in={this.state.chartsMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/mypage/mygroups")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/mypage/mygroups"
                  >
                    <Trans>My Groups</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/my-timetable/timetable")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/my-timetable/timetable"
                  >
                    <Trans>My Timetable</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Withdrawal />
                </li>
              </ul>

            </Collapse>
          </li>

          <li className={this.isPathActive("/groups") ? "nav-item active" : "nav-item"}>
            <div
              className={
                this.state.groupsMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("groupsMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>Groups</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-account-multiple menu-icon"></i>
            </div>
            <Collapse in={this.state.groupsMenuOpen}>
              <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/groups/group")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/groups/group"
                  >
                    <Trans>Group 1</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/groups/groupTest")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/groups/groupTest"
                  >
                    <Trans>Group Test Page</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      this.isPathActive("/groups/groupTestAdmin")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/groups/groupTestAdmin"
                  >
                    <Trans>Group Test Page Admin</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li className={this.isPathActive('/friends') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/friends">
              <span className="menu-title"><Trans>Friends</Trans></span>
              <i className="mdi mdi-account-star menu-icon"></i>
            </Link>

          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

export default withRouter(Sidebar);
