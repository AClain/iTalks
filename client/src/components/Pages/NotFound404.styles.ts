import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	container: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundImage: "url('/assets/images/404_works.svg')",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
	},
});

export { useStyles };
