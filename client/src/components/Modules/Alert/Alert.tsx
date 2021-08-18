import { FC, useContext, useEffect } from "react";

import { useStyles } from "./Alert.styles";
import { AlertContext } from "providers/AlertContext";
import { Alert as MUIAlert, AlertTitle } from "@material-ui/lab";

const Alert: FC<{}> = () => {
	// Styles
	const styles = useStyles();
	const { alert, setAlert } = useContext(AlertContext);
	// Custom methods
	const displayTitle = () => {
		let title = "Information";

		switch (alert.variant) {
			case "error":
				title = "Erreur";
				break;
			case "warning":
				title = "Attention";
				break;
			case "success":
				title = "Succès";
				break;
		}

		return title;
	};
	// Effects
	useEffect(() => {
		let event = setTimeout(() => {
			setAlert({ ...alert, shouldDisplay: false });
		}, 5000);
		return () => {
			clearTimeout(event);
		};
	});

	return alert.shouldDisplay ? (
		<MUIAlert
			className={`${styles.alert} ${alert.shouldDisplay ? styles.alertShow : styles.alertHidden}`}
			severity={alert.variant}
		>
			<AlertTitle>{displayTitle()}</AlertTitle>
			{alert.message}
		</MUIAlert>
	) : null;
};

export default Alert;
