import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Sidebar from "../components/Global/Sidebar";

// Admin routes
import Users from "../components/Admin/User/Users";
import UserCreate from "../components/Admin/User/UserCreate";
import User from "../components/Admin/User/User";
import UserEdit from "../components/Admin/User/UserEdit";
import NotFoundAdmin from "../components/Admin/NotFoundAdmin";

// Unauthenticated routes
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

// Authenticated routes
import Home from "../components/Global/Home";
import Search from "../components/Search/Search";
import Notifications from "../components/Notifications/Notifications";
import Saved from "../components/Saved/Saved";
import Profil from "../components/Profil/Profil";
import Messages from "../components/Messages/Messages";
import Settings from "../components/Settings/Settings";

// Not found
import NotFound from "../components/Misc/NotFound";

import GlobalAlert from "../components/Misc/GlobalAlert";
import SwitchTheme from "../components/Misc/SwitchTheme";

export default function Routes() {
  return (
    <Router>
      <Switch>
        {/* Authenticated routes */}
        <Route exact path="/">
          <Sidebar />
          <Home />
        </Route>
        <Route exact path="/search">
          <Sidebar />
          <Search />
        </Route>
        <Route exact path="/notifications">
          <Sidebar />
          <Notifications />
        </Route>
        <Route exact path="/saved">
          <Sidebar />
          <Saved />
        </Route>
        <Route exact path="/profil">
          <Sidebar />
          <Profil />
        </Route>
        <Route exact path="/messages">
          <Sidebar />
          <Messages />
        </Route>
        <Route exact path="/settings">
          <Sidebar />
          <Settings />
        </Route>

        {/* Unauthenticated routes */}
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/register">
          <RegisterForm />
        </Route>
        <Route exact path="/logout"></Route>

        {/* Admin routes */}
        <Route path="/admin">
          <Switch>
            <Route exact path="/admin/users">
              <Sidebar />
              <Users />
            </Route>
            <Route exact path="/admin/user/create">
              <Sidebar />
              <UserCreate />
            </Route>
            <Route exact path="/admin/user/:username">
              <Sidebar />
              <User />
            </Route>
            <Route exact path="/admin/user/:username/edit">
              <Sidebar />
              <UserEdit />
            </Route>

            <Route path="*">
              <NotFoundAdmin />
            </Route>
          </Switch>
        </Route>

        {/* No match */}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <GlobalAlert />
      <SwitchTheme />
    </Router>
  );
}
