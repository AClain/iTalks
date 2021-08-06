import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	timestamp: {
		color: "var(--text)",
	},
	sender: {
		textAlign: "right",
	},
	receiver: {
		textAlign: "left",
	},
});

export { useStyles };
