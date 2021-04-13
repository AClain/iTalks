import { useState } from "react";
import { Switch, Route } from "react-router-dom";

// Sidebar
import Sidebar from "../components/Global/Sidebar";
// Sidebar 1
import Home from "../components/Global/Home";
import Search from "../components/Search/Search";
import Notifications from "../components/Notifications/Notifications";
import Saved from "../components/Saved/Saved";
// Sidebar 2
import Profil from "../components/Profil/Profil";
import Messages from "../components/Messages/Messages";
import Settings from "../components/Settings/Settings";
// User
import Login from "../components/User/Login";
import Register from "../components/User/Register";
// Other
import AdminRoutes from "./AdminRoutes";
import NotFound from "../components/Misc/NotFound";
// Global
import GlobalAlert from "../components/Misc/GlobalAlert";

import { GlobalAlertContext } from "../components/Global/GlobalAlertContext";

export default function Routes() {
  const [alert, setAlert] = useState({
    message: "Succes!",
    status: "success",
    shouldDisplay: false,
  });

  return (
    <GlobalAlertContext.Provider value={{ alert, setAlert }}>
      <Switch>
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

        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>

        <Route path="/admin">
          <AdminRoutes />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <GlobalAlert />
    </GlobalAlertContext.Provider>
  );
}
