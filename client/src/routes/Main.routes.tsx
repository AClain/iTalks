import { FC } from "react";

import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import AuthenticatedRoute from "routes/AuthenticatedRoute";
import UnauthenticatedRoute from "routes/UnauthenticatedRoute";
import AdminAuthenticatedRoute from "routes/AdminAuthenticatedRoute";

import Home from "components/Pages/Home";
import SidebarFloat from "components/Submodules/SidebarFloat/SidebarFloat";
import NotFound404 from "components/Pages/NotFound404";
import TopContainer from "components/Modules/TopContainer";
import Sidebar from "components/Submodules/Sidebar/Sidebar";
import Logout from "components/Pages/Logout";
import Login from "components/Pages/Login";

const Routes: FC<{}> = () => {
	let location = useLocation();
	const currentPath = location.pathname;

	return (
		<>
			<Switch>
				{/* Authenticated routes */}
				<AuthenticatedRoute exact path='/'>
					<TopContainer sidebar={<Sidebar />} page={<Home />} />
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/search'>
					<></>
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/notifications'>
					<></>
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/saved'>
					<></>
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/profil'>
					<></>
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/messages'>
					<></>
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/settings'>
					<></>
				</AuthenticatedRoute>
				<AuthenticatedRoute exact path='/logout'>
					<TopContainer page={<Logout />} />
				</AuthenticatedRoute>

				{/* Unauthenticated routes */}
				<UnauthenticatedRoute exact path='/login'>
					<TopContainer page={<Login />} />
				</UnauthenticatedRoute>
				<UnauthenticatedRoute exact path='/register'>
					<></>
				</UnauthenticatedRoute>

				{/* Admin routes */}
				<Route path='/admin'>
					<Switch>
						<AdminAuthenticatedRoute exact path='/admin/users'>
							<></>
						</AdminAuthenticatedRoute>
						<AdminAuthenticatedRoute exact path='/admin/user/create'>
							<></>
						</AdminAuthenticatedRoute>
						<AdminAuthenticatedRoute exact path='/admin/user/:username'>
							<></>
						</AdminAuthenticatedRoute>
						<AdminAuthenticatedRoute exact path='/admin/user/:username/edit'>
							<></>
						</AdminAuthenticatedRoute>

						<AdminAuthenticatedRoute exact path='/admin/statuses'>
							<></>
						</AdminAuthenticatedRoute>

						<AdminAuthenticatedRoute path='*'>
							<></>
						</AdminAuthenticatedRoute>
					</Switch>
				</Route>

				{/* Public routes */}
				<Route path='/verify_email'>
					<></>
				</Route>

				{/* No match */}
				<Route path='/404' exact>
					<NotFound404 />
				</Route>

				<Route path='/'>
					<Redirect to='/404' />
				</Route>
			</Switch>
			<SidebarFloat exclude={["/404"].includes(currentPath)} />
		</>
	);
};

export default Routes;
