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
		}, 5000);
		return () => {
			clearTimeout(event);
		};
	}, [alert.shouldDisplay]);

	return alert.shouldDisplay ? (
		<Flex
			className={`${alert.shouldDisplay ? styles.alertShow : styles.alertHidden} ${styles.alert}`}
			direction={FlexDirectionEnum.Horizontal}
		>
			{/* <MUIAlert severity={alert.variant}></MUIAlert>

			<Alert id='global-alert' status={alert.status} w='max-content' variant='left-accent'>
				<AlertIcon />
				{alert.message}
				<CloseButton
					ml='100'
					onClick={() => {
						setAlert({ ...alert, shouldDisplay: false });
					}}
				/>
			</Alert> */}
		</Flex>
	) : null;
};

export default Alert;
