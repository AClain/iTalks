import { Switch, Route } from "react-router-dom";

import Sidebar from "../components/Global/Sidebar";

import Search from "../components/Search/Search";
import Notifications from "../components/Notifications/Notifications";
import Saved from "../components/Saved/Saved";

import Profil from "../components/Profil/Profil";
import Messages from "../components/Messages/Messages";
import Settings from "../components/Settings/Settings";

const LoggedInRoutes = () => {
  <Switch>
    <Sidebar />
    <Route exact path="/search">
      <Search />
    </Route>
    <Route exact path="/notifications">
      <Notifications />
    </Route>
    <Route exact path="/saved">
      <Saved />
    </Route>

    <Route exact path="/profil">
      <Profil />
    </Route>
    <Route exact path="/messages">
      <Messages />
    </Route>
    <Route exact path="/settings">
      <Settings />
    </Route>
  </Switch>;
};

export default LoggedInRoutes;
