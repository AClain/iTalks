import { Switch, Route } from "react-router-dom";

const LoggedInRoutes = () => {
	<Switch>
		<Route exact path='/search'></Route>
		<Route exact path='/notifications'></Route>
		<Route exact path='/saved'></Route>

		<Route exact path='/profil'></Route>
		<Route exact path='/messages'></Route>
		<Route exact path='/settings'></Route>
	</Switch>;
};

export default LoggedInRoutes;
