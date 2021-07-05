import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	form: {},
	label: {
		color: "var(--text)",
	},
	input: {
		color: "var(--text)",
		"&::before": {
			borderColor: "var(--text)",
		},
	},
	icon: {
		color: "var(--text)",
	},
});

export { useStyles };
