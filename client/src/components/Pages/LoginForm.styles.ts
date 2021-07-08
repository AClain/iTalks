import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	leftContainer: {
		width: "50%",
		background: "var(--text)",
	},
	rightContainer: {
		width: "50%",
	},
	form: {
		display: "flex",
		flexDirection: "column",
	},
	title: {
		marginBottom: "15px",
	},
	icon: {
		color: "var(--text)",
	},
	loading: {
		color: "var(--text)",
	},
	error: {
		color: "var(--danger)",
	},
	checkboxContainer: {
		width: "max-content",
	},
	checkbox: {
		color: "var(--text)!important",
	},
	submit: {
		marginTop: "15px",
	},
});

export { useStyles };
