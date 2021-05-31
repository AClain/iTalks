import PropTypes from "prop-types";

// React libraries
import { Redirect, Route } from "react-router-dom";

// Contexts
import Auth from "../api/Auth";

const AdminAuthenticatedRoute = ({ children, ...rest }) => {
	return (Auth.isAuthenticated() && Auth.isAdmin() && <Route {...rest}>{children}</Route>) || <Redirect to='/' />;
};

AdminAuthenticatedRoute.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
};

export default AdminAuthenticatedRoute;
