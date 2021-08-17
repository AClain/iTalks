import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	label: {
		margin: "0px 5px",
		fontSize: (props: { size?: string }) => (props.size ? props.size : "18px"),
	},
});

export { useStyles };
