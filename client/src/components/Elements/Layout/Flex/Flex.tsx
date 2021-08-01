import { FC } from "react";
import { FlexProps } from "components/Elements/Layout/Flex/Flex.d";
import { Box } from "@material-ui/core";

const DIRECTIONS: any = {
	horizontal: "row",
	vertical: "column",
};

const Flex: FC<FlexProps> = ({ direction, justify, align, centered, fullWidth, width, children, ...rest }) => {
	return (
		<Box
			{...rest}
			display='flex'
			justifyContent={centered ? "center" : justify}
			alignItems={centered ? "center" : align}
			flexDirection={DIRECTIONS[direction]}
			color='var(--text)'
			width={fullWidth ? "100%" : width}
		>
			{children}
		</Box>
	);
};

export default Flex;
