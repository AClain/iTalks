import { Switch, Route } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import Sidebar from "../components/Global/Sidebar";

import Users from "../components/Admin/User/Users";
import UserCreate from "../components/Admin/User/UserCreate";
import User from "../components/Admin/User/User";
import UserEdit from "../components/Admin/User/UserEdit";
import NotFoundAdmin from "../components/Admin/NotFoundAdmin";

export default function AdminRoutes() {
  let { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${url}/users`}>
        <Sidebar />
        <Users />
      </Route>
      <Route exact path={`${url}/user/create`}>
        <Sidebar />
        <UserCreate />
      </Route>
      <Route exact path={`${url}/user/:username`}>
        <Sidebar />
        <User />
      </Route>
      <Route exact path={`${url}/user/:username/edit`}>
        <Sidebar />
        <UserEdit />
      </Route>

      <Route path="*">
        <NotFoundAdmin />
      </Route>
    </Switch>
  );
}
