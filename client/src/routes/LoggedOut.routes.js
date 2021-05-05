import { Switch, Route } from "react-router";

import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

const LoggedOutRoutes = () => {
  return (
    <Switch>
      <Route exact path="/login">
        <LoginForm />
      </Route>
      <Route exact path="/register">
        <RegisterForm />
      </Route>
      <Route exact path="/logout"></Route>
    </Switch>
  );
};

export default LoggedOutRoutes;
