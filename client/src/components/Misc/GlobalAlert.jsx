import { useContext, useEffect } from "react";
import { GlobalContext } from "../../providers/GlobalContext";

import { Flex } from "@chakra-ui/layout";
import { Alert, AlertIcon, CloseButton } from "@chakra-ui/react";

import "./styles/global_alert.css";

const GlobalAlert = (props) => {
	const { alert, setAlert } = useContext(GlobalContext);

	return alert.shouldDisplay ? (
		<Flex
			position='fixed'
			bottom='55px'
			pr='50px'
			justifyContent='flex-end'
			className={alert.shouldDisplay ? "alert-show" : "alert-hidden"}
			w='100%'
			color='var(--bg)'>
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
};

export default GlobalAlert;
