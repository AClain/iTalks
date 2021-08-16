import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	container: {
		overflowY: "auto",
		marginBottom: "10px",
		height: "100%",
		scrollbarColor: "var(--info) transparent",
		scrollbarWidth: "thin",
		"&::-webkit-scrollbar": {
			width: "7px",
		},
		"&::-webkit-scrollbar-track": {
			background: "transparent",
		},
		"&::-webkit-scrollbar-thumb": {
			background: "var(--info)",
			borderRadius: "10px",
		},
	},
	timestamp: {
		color: "var(--text)",
	},
	message: {
		maxWidth: "70%",
		borderRadius: "5px",
		padding: "10px",
	},
	sender: {
		alignItems: "flex-end",
	},
	senderMessage: {
		textAlign: "right",
		background: "#48B0F7",
	},
	receiver: {
		alignItems: "flex-start",
	},
	receiverMessage: {
		textAlign: "left",
		background: "var(--text)",
		color: "var(--bg)",
	},
});

export { useStyles };
