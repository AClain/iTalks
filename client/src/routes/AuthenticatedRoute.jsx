import PropTypes from "prop-types";

// React libraries
import { Redirect, Route } from "react-router-dom";

// Contexts
import Auth from "../api/Auth";

const AuthenticatedRoute = ({ children, ...rest }) => {
	return (Auth.isAuthenticated() && <Route {...rest}>{children}</Route>) || <Redirect to='/login' />;
};

AuthenticatedRoute.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
};

export default AuthenticatedRoute;
