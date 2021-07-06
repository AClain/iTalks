import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	container: {
		backdropFilter: "blur(16px)",
		webkitBackdropFilter: "blur(16px)",
		background: "rgba(17, 25, 40, 0.75)",
		borderRadius: "12px",
		border: "1px solid rgba(255, 255, 255, 0.125)",
	},
	card: {
		width: "100%",
	},
});

export { useStyles };
