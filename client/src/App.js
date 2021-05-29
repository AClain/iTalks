require("dotenv").config();
import "moment/locale/fr";

import { useState } from "react";
import { HelmetProvider } from "react-helmet-async";

import { ChakraProvider } from "@chakra-ui/react";

import { GlobalContext } from "./providers/GlobalContext";
import GlobalProvider from "./providers/GlobalProvider";

import { Box } from "@chakra-ui/react";

import Routes from "./routes/Main.routes";

const App = () => {
	const [alert, setAlert] = useState({
		message: "Succes!",
		status: "success",
		shouldDisplay: false,
	});

	const [theme, setTheme] = useState(GlobalProvider.getClientTheme());

	return (
		<HelmetProvider>
			<ChakraProvider>
				<GlobalContext.Provider value={{ alert, setAlert, theme, setTheme }}>
					<Box className={`${theme}`} h='100vh' minH='500px' overflowY='auto'>
						<Routes />
					</Box>
				</GlobalContext.Provider>
			</ChakraProvider>
		</HelmetProvider>
	);
};

export default App;
