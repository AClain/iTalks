import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Sidebar from "../components/Global/Sidebar";

import Home from "../components/Global/Home";

import NotFound from "../components/Misc/NotFound";

import GlobalAlert from "../components/Misc/GlobalAlert";
import SwitchTheme from "../components/Misc/SwitchTheme";

import AdminRoutes from "./Admin.routes";
import LoggedInRoutes from "./LoggedIn.routes";
import LoggedOutRoutes from "./LoggedOut.routes";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Sidebar />
          <Home />
        </Route>

        <Route path="/admin">
          <AdminRoutes />
        </Route>

        <LoggedOutRoutes />
        <LoggedInRoutes />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <GlobalAlert />
      <SwitchTheme />
    </Router>
  );
}
