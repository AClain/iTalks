import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	container: {
		width: "auto",
		borderBottom: "solid 1px var(--text)",
		padding: "45px 25px",
		"&:last-child": {
			border: "none",
		},
	},
	infos: {
		minWidth: "75%",
	},
	user: {
		marginRight: "10px",
		fontStyle: "italic",
	},
	content: {
		color: "var(--reverse-text)",
		margin: "10px 0px",
	},
	date: {
		fontStyle: "italic",
	},
	image: {
		width: "15%",
		objectFit: "cover",
		margin: "0px 15px",
	},
});

export { useStyles };
