import PropTypes from "prop-types";

import { Redirect, Route } from "react-router-dom";
import Auth from "../api/Auth";

const UnauthenticatedRoute = ({ children, ...rest }) => {
	return (Auth.isUnauthenticated() && <Route {...rest}>{children}</Route>) || <Redirect to='/' />;
};

UnauthenticatedRoute.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
};

export default UnauthenticatedRoute;
