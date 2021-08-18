import { FC, useContext, useEffect } from "react";

import { useStyles } from "./Alert.styles";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { AlertContext } from "providers/AlertContext";
import { Alert as MUIAlert } from "@material-ui/lab";

interface AlertProps {}

const Alert: FC<AlertProps> = ({}) => {
	// Styles
	const styles = useStyles();
	const { alert, setAlert } = useContext(AlertContext);

	useEffect(() => {
		let event = setTimeout(() => {
			setAlert({ ...alert, shouldDisplay: false });
		}, 50000000);
		return () => {
			clearTimeout(event);
		};
	}, [alert.shouldDisplay]);

	return alert.shouldDisplay ? (
		<MUIAlert
			className={`${styles.alert} ${alert.shouldDisplay ? styles.alertShow : styles.alertHidden}`}
			severity={alert.variant}
		></MUIAlert>
	) : null;
};

export default Alert;
