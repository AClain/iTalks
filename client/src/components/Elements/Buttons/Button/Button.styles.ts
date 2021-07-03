import { makeStyles } from "@material-ui/core";
import { ButtonProps, ButtonTypeType, ButtonSizeType } from "./Button.d";

const TYPES: ButtonTypeType = {
	default: "default",
	info: "info",
	success: "success",
	warning: "warning",
	danger: "danger",
};

const SIZES: ButtonSizeType = {
	sm: "16px",
	md: "20px",
	lg: "24px",
};

const useStyles = makeStyles({
	default: {
		padding: "1em 1.75em",
		fontFamily: "Roboto Black",
		fontSize: (props: ButtonProps) => (props.size ? SIZES[props.size] : "16px"),
		width: (props: ButtonProps) => (props.fullWidth ? "100%" : "max-content"),
	},
});

export { useStyles };
