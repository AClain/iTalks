import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	alert: {
		position: "fixed",
		bottom: "55px",
		paddingRight: "50px",
		width: "100%",
	},
	alertShow: {
		animation: "fadeIn 0.4s both",
	},
	alertHidden: {
		display: "none!important",
	},
});

export { useStyles };

/**
 * 
@keyframes fadeIn {
    from {
        transform: scale(0);
    }
    to {
        transform: scale(1);
    }
}
 */
