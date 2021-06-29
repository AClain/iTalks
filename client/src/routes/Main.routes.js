import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Sidebar from "../components/Global/Sidebar";

// Admin routes
import Users from "../components/Admin/User/Users";
import UserCreate from "../components/Admin/User/UserCreate";
import User from "../components/Admin/User/User";
import UserEdit from "../components/Admin/User/UserEdit";
import Statuses from "../components/Admin/Status/Statuses";

// Not found admin
import NotFoundAdmin from "../components/Admin/NotFoundAdmin";

// Unauthenticated routes
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import VerifyEmail from "../components/Auth/VerifyEmail";

// Authenticated routes
import Home from "../components/Global/Home";
import Search from "../components/Search/Search";
import Notifications from "../components/Notifications/Notifications";
import Saved from "../components/Saved/Saved";
import Profil from "../components/Profil/Profil";
import Messages from "../components/Messages/Messages";
import Settings from "../components/Settings/Settings";

// Not found
import NotFound from "../components/Misc/NotFound";

import GlobalAlert from "../components/Global/GlobalAlert";
import SwitchTheme from "../components/Misc/SwitchTheme";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import AdminAuthenticatedRoute from "./AdminAuthenticatedRoute";

const Routes = () => {
	return (
		<Router>
			<Switch>
				{/* Authenticated routes */}
				<AuthenticatedRoute exact path='/'>
					<Sidebar />
					<Home />
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/search'>
					<Sidebar />
					<Search />
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/notifications'>
					<Sidebar />
					<Notifications />
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/saved'>
					<Sidebar />
					<Saved />
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/profil'>
					<Sidebar />
					<Profil />
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/messages'>
					<Sidebar />
					<Messages />
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/settings'>
					<Sidebar />
					<Settings />
				</AuthenticatedRoute>

				{/* Unauthenticated routes */}
				<UnauthenticatedRoute exact path='/login'>
					<LoginForm />
				</UnauthenticatedRoute>
				<UnauthenticatedRoute exact path='/register'>
					<RegisterForm />
				</UnauthenticatedRoute>

				{/* Admin routes */}
				<Route path='/admin'>
					<Switch>
						<AdminAuthenticatedRoute exact path='/admin/users'>
							<Sidebar />
							<Users />
						</AdminAuthenticatedRoute>
						<AdminAuthenticatedRoute exact path='/admin/user/create'>
							<Sidebar />
							<UserCreate />
						</AdminAuthenticatedRoute>
						<AdminAuthenticatedRoute exact path='/admin/user/:username'>
							<Sidebar />
							<User />
						</AdminAuthenticatedRoute>
						<AdminAuthenticatedRoute exact path='/admin/user/:username/edit'>
							<Sidebar />
							<UserEdit />
						</AdminAuthenticatedRoute>

						<AdminAuthenticatedRoute exact path='/admin/statuses'>
							<Sidebar />
							<Statuses />
						</AdminAuthenticatedRoute>

						<AdminAuthenticatedRoute path='*'>
							<NotFoundAdmin />
						</AdminAuthenticatedRoute>
					</Switch>
				</Route>

				{/* Public routes */}
				<Route path='/verify_email'>
					<VerifyEmail />
				</Route>

				{/* No match */}
				<Route path='*'>
					<NotFound />
				</Route>
			</Switch>
			<GlobalAlert />
			<SwitchTheme />
		</Router>
	);
};

export default Routes;
