import { Switch, Route } from "react-router";

const LoggedOutRoutes = () => {
	return (
		<Switch>
			<Route exact path='/login'></Route>
			<Route exact path='/register'></Route>
			<Route exact path='/logout'></Route>
		</Switch>
	);
};

export default LoggedOutRoutes;
