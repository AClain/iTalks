import React from "react";
import { HelmetProvider } from "react-helmet-async";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import { BrowserRouter as Router } from "react-router-dom";

import { Box } from "@chakra-ui/react";

import Routes from "./routes/Routes";

const theme = extendTheme({
  colors: {
    main: {
      purple: "#6930C3",
      light: "#F1F1F1",
      lightBlue: "#A4EBF3",
      dark: "#222831",
    },
  },
});

export default function App() {
  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <Router>
          <Box bgColor="#222831" h="100vh" minH="500px" overflowY="auto">
            <Routes />
          </Box>
        </Router>
      </ChakraProvider>
    </HelmetProvider>
  );
}
