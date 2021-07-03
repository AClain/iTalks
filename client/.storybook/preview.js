import "../src/assets/styles/reset.css";
import "../src/assets/styles/fonts.css";
import "../src/assets/styles/main.css";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

import { muiTheme } from "storybook-addon-material-ui";

export const decorators = [muiTheme()];
