import { makeStyles } from "@material-ui/core";
import { darken } from "@material-ui/core/styles";

type ResetLinkStylesProps = {
	color?: string;
};

const useStyles = makeStyles({
	link: {
		width: "max-content",
		position: "relative",
		margin: "0px",
		padding: "0px",
		textDecoration: "none",
		"&:hover": {
			color: (props: ResetLinkStylesProps) => (props.color ? darken(props.color, 0.5) : "var(--purple-focus)"),
		},
		"&:visited": {
			color: "inherit",
		},
		"&:selected": {
			color: "inherit",
		},
	},
});

export { useStyles };

// const darkenedColor50Percent = darken('#4f4', 0.5);
