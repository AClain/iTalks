// React libraries
import { useEffect, useState, useContext } from "react";
import { Route, useHistory, useLocation } from "react-router-dom";

// Contexts
import { GlobalContext } from "../providers/GlobalContext";

import axios from "axios";

const UnauthenticatedRoute = (props, { ...rest }) => {
	// Context
	const { alert, setAlert } = useContext(GlobalContext);

	// React router dom
	const location = useLocation();
	const history = useHistory();

	// States
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
			url: process.env.REACT_APP_SERVER_URL + "/api/unauthenticated",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			withCredentialsh: true,
		})
			.then((res) => {
				console.log(res);
				console.log("unauthenticated request: logged out (res: " + res.status + ")");
				setLoading(false);
				if (res.status === 201) {
					return true;
				}
				onServerUnavailable("500: Impossible de se connecter au serveur. Veuillez réessayer plus tard.");
				history.push("/");
				return false;
			})
			.catch((err) => {
				console.log(err.response);
				console.log("unauthenticated request: logged in (err: " + err.response.status + ")");
				setLoading(false);
				if (err.response.status === 404) {
					onServerUnavailable("500: Impossible de se connecter au serveur. Veuillez réessayer plus tard.");
				}
				return false;
			});
	}, [location]);

	return loading ? null : <Route {...rest}>{props.children}</Route>;
};

export default UnauthenticatedRoute;
