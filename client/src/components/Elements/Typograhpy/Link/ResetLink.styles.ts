import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	link: {
		width: "max-content",
		position: "relative",
		margin: "0px",
		padding: "0px",
		"&:visited": {
			color: "inherit",
		},
		"&:selected": {
			color: "inherit",
		},
	},
});

export { useStyles };
