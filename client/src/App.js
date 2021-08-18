// React
import { useState } from "react";

// Providers
import { HelmetProvider } from "react-helmet-async";
import { ThemeContext } from "providers/ThemeContext";
import ThemeProvider from "providers/ThemeProvider";

import { BrowserRouter as Router } from "react-router-dom";

import Routes from "routes/Main.routes";
import { Box } from "@material-ui/core";
import moment from "moment";
import "moment/locale/fr";
import { EventContext } from "providers/EventContext";
import EventProvider from "providers/EventProvider";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { AlertContext } from "providers/AlertContext";
import Alert from "components/Modules/Alert/Alert";

moment.locale("fr");

export default function App() {
	const [theme, setTheme] = useState(ThemeProvider.getClientTheme());
	const Echo = EventProvider.defaultEchoEvent();

	const [alert, setAlert] = useState({
		message: "Succes!",
		status: "success",
		shouldDisplay: false,
	});

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<HelmetProvider>
				<ThemeContext.Provider value={{ theme, setTheme }}>
					<EventContext.Provider value={{ Echo }}>
						<AlertContext.Provider value={{ alert, setAlert }}>
							<Box className={`${theme}`} height='100vh' minHeight='500px' overflow='auto'>
								<Router>
									<Routes />
								</Router>
							</Box>
							<Alert />
						</AlertContext.Provider>
					</EventContext.Provider>
				</ThemeContext.Provider>
			</HelmetProvider>
		</MuiPickersUtilsProvider>
	);
}
