import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import auth from "../api/Auth";

const AuthenticatedRoute = (props, { ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth
      .isAuthenticated()
      .then((data) => {
        if (data.status === 201) {
          console.log("AuthenticatedRoute: is authenticated");
          setIsAuthenticated(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log("AuthenticatedRoute: is not authenticated");
          setIsAuthenticated(false);
          setLoading(false);
        }
      });
  }, []);

  return loading ? null : isAuthenticated ? (
    <Route {...rest}>{props.children}</Route>
  ) : (
    <Redirect to="/login" />
  );
};

export default AuthenticatedRoute;
