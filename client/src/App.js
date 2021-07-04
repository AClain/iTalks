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

moment.locale("fr");

export default function App() {
	const [theme, setTheme] = useState(ThemeProvider.getClientTheme());

	return (
		<HelmetProvider>
			<ThemeContext.Provider value={{ theme, setTheme }}>
				<Box className={`${theme}`} height='100vh' minHeight='500px' overflow='auto'>
					<Router>
						<Routes />
					</Router>
				</Box>
			</ThemeContext.Provider>
		</HelmetProvider>
	);
}
