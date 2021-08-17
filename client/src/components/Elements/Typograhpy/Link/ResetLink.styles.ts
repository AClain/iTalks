import { makeStyles } from "@material-ui/core";

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
			color: (props: ResetLinkStylesProps) => (props.color ? props.color : "var(--purple-focus)"),
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
