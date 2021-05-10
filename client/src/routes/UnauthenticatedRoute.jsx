import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import auth from "../api/Auth";

const AuthenticatedRoute = (props, { ...rest }) => {
  const [isUnauthenticated, setIsUnauthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth
      .isAuthenticated()
      .then((data) => {
        if (data.status === 201) {
          console.log("UnauthenticatedRoute: is authenticated");
          setIsUnauthenticated(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log("UnauthenticatedRoute: is not authenticated");
          setIsUnauthenticated(true);
          setLoading(false);
        }
      });
  }, []);

  return loading ? null : isUnauthenticated ? (
    <Route {...rest}>{props.children}</Route>
  ) : (
    <Redirect to="/" />
  );
};

export default AuthenticatedRoute;
