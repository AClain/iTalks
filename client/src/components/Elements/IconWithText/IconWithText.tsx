// React
import { FC } from "react";
// Librairies
import { Typography } from "@material-ui/core";
// Types
import { FlexAlignEnum, FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { useStyles } from "./IconWithText.styles";
// Components
import Flex from "components/Elements/Layout/Flex/Flex";

export interface IconWithTextProps {
	icon: JSX.Element;
	label: string;
}

const IconWithText: FC<IconWithTextProps> = ({ icon, label }) => {
	const styles = useStyles();

	return (
		<Flex direction={FlexDirectionEnum.Horizontal} align={FlexAlignEnum.Center}>
			{icon} <Typography className={styles.label}>{label}</Typography>
		</Flex>
	);
};

export default IconWithText;
