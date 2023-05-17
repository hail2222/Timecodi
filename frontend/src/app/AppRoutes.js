import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "../app/shared/Spinner";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Buttons = lazy(() => import("./basic-ui/Buttons"));
const Dropdowns = lazy(() => import("./basic-ui/Dropdowns"));
const Typography = lazy(() => import("./basic-ui/Typography"));
const BasicElements = lazy(() => import("./form-elements/BasicElements"));
const BasicTable = lazy(() => import("./tables/BasicTable"));
const Mdi = lazy(() => import("./icons/Mdi"));

const ChartJs = lazy(() => import("./charts/ChartJs"));

const Login = lazy(() => import("./user-pages/Login"));
const Register = lazy(() => import("./user-pages/Register"));
const BlankPage = lazy(() => import("./general-pages/BlankPage"));
const StartPage = lazy(() => import("./StartPage"));
const FriendsPage = lazy(() => import('./friends-page/FriendsPage'));
const MyTimetablePage = lazy(() => import('./my-timetable/timetable'));

const MyGroup = lazy(() => import("./mypages/MyGroup"));
const Group = lazy(() => import("./groups/Group"));
const GroupTest = lazy(() => import("./groups/GroupTest"));
const GroupTestAdmin = lazy(() => import("./groups/GroupTestAdmin"));


class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/groups/group" component={Group} />
          <Route path="/basic-ui/dropdowns" component={Dropdowns} />
          <Route path="/basic-ui/typography" component={Typography} />
          <Route path="/form-Elements/basic-elements" component={BasicElements} />
          <Route path="/tables/basic-table" component={BasicTable} />
          <Route path="/icons/mdi" component={Mdi} />
          <Route path="/mypage/mygroups" component={MyGroup} />
          <Route path="/user-pages/login" component={Login} />
          <Route path="/user-pages/register" component={Register} />

          <Route path="/general-pages/blank-page" component={BlankPage} />
          <Route path="/startPage" component={StartPage} />
          <Route path="/friends" component={ FriendsPage } />
          <Route path="/my-timetable/timetable" component={ MyTimetablePage } />
          <Route path="/groups/groupTest" component={GroupTest} />
          <Route path="/groups/groupTestAdmin" component={GroupTestAdmin} />

          <Redirect to="/startPage" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
