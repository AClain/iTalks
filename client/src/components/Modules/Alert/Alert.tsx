import { FC, useContext, useEffect } from "react";

import { useStyles } from "./Alert.styles";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { AlertContext } from "providers/AlertContext";

interface AlertProps {

}

const Alert: FC<AlertProps> = ({}) => {
	// Styles
	const styles = useStyles();
	const alertContext = useContext(AlertContext);

	useEffect(() => {
		let event = setTimeout(() => {
			alertContext.setAlert({ ...alert, shouldDisplay: false });
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
            <Alert severity={alert.}>This is an error alert — check it out!</Alert>

			<Alert id='global-alert' status={alert.status} w='max-content' variant='left-accent'>
				<AlertIcon />
				{alert.message}
				<CloseButton
					ml='100'
					onClick={() => {
						setAlert({ ...alert, shouldDisplay: false });
					}}
				/>
			</Alert>
		</Flex>
	) : null;
}

export default Alert