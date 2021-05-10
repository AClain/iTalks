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
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

export default function Routes() {
  return (
    <Router>
      <Switch>
        {/* Authenticated routes */}
        <AuthenticatedRoute exact path="/">
          <Sidebar />
          <Home />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/search">
          <Sidebar />
          <Search />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/notifications">
          <Sidebar />
          <Notifications />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/saved">
          <Sidebar />
          <Saved />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/profil">
          <Sidebar />
          <Profil />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/messages">
          <Sidebar />
          <Messages />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/settings">
          <Sidebar />
          <Settings />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/logout"></AuthenticatedRoute>

        {/* Unauthenticated routes */}
        <UnauthenticatedRoute exact path="/login">
          <LoginForm />
        </UnauthenticatedRoute>
        <UnauthenticatedRoute exact path="/register">
          <RegisterForm />
        </UnauthenticatedRoute>

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
