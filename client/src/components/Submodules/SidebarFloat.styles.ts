import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	default: {
		fontSize: "50px",
		"&:hover": {
			cursor: "pointer",
		},
	},
	open: {
		transition: "all .2s ease-in",
		"&:hover": {
			transform: "rotate(45deg)",
		},
	},
	subIcon: {
		fontSize: "35px",
		background: "var(--info)",
		color: "var(--text)",
		borderRadius: "50%",
		padding: ".25em",
		margin: "5px 0px",
		"&:hover": {
			cursor: "pointer",
		},
	},
});

export { useStyles };
