import PropTypes from "prop-types";

// React libraries
import { useEffect, useState, useContext } from "react";
import { Route, useHistory, useLocation } from "react-router-dom";

// Contexts
import { GlobalContext } from "../providers/GlobalContext";

import axios from "axios";

const AuthenticatedRoute = ({ children, ...rest }) => {
	// Context
	const { alert, setAlert } = useContext(GlobalContext);

	// React router dom
	const location = useLocation();
	const history = useHistory();
	const [loading, setLoading] = useState(true);

	// Custom functions
	const onServerUnavailable = (message) => {
		setAlert({
			...alert,
			message: message,
			status: "error",
			shouldDisplay: true,
		});
	};

	useEffect(() => {
		axios({
			method: "get",
			url: process.env.REACT_APP_SERVER_URL + "/api/authenticated",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			withCredentialsh: true,
		})
			.then((res) => {
				console.log(res);
				console.log("authenticated request: logged in (res: " + res.status + ")");
				setLoading(false);
				if (res.status === 201) {
					return true;
				}
				onServerUnavailable("500: Impossible de se connecter au serveur. Veuillez réessayer plus tard.");
				history.push("/login");
				return false;
			})
			.catch((err) => {
				console.log(err.response);
				console.log("authenticated request: logged out (err: " + err.response.status + ")");
				setLoading(false);
				if ([401].includes(err.response.status)) {
					history.push("/login");
				} else if ([404].includes(err.response.status)) {
					onServerUnavailable("500: Impossible de se connecter au serveur. Veuillez réessayer plus tard.");
				}
				return false;
			});
	}, [location]);

	return !loading && <Route {...rest}>{children}</Route>;
};

AuthenticatedRoute.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
};

export default AuthenticatedRoute;
