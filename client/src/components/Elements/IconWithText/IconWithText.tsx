import { Typography } from "@material-ui/core";
import { FC } from "react";

import { useStyles } from "./IconWithText.styles";

import Flex, { FlexAlignEnum, FlexDirectionEnum } from "../Layout/Flex/Flex";

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
