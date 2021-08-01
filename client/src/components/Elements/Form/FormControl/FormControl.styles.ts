import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	formControl: {
		margin: "10px 0px",
		minWidth: "450px",
	},
	label: {
		color: "var(--text)",
	},
	input: {
		color: "var(--text)",
		"&::before": {
			borderColor: "var(--text)",
		},
	},
});

export { useStyles };
