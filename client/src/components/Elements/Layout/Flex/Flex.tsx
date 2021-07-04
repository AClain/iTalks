import { FC, ReactNode } from "react";

import { Box } from "@material-ui/core";

export enum FlexDirectionEnum {
	Horizontal = "horizontal",
	Vertical = "vertical",
}

export enum FlexJustifyEnum {
	Center = "center",
	Start = "start",
	End = "end",
	SpaceBetween = "space-between",
	SpaceAround = "space-around",
	SpaceEvenly = "space-evenly",
}

export enum FlexAlignEnum {
	Start = "start",
	Center = "center",
	End = "end",
}

export interface FlexProps {
	direction: FlexDirectionEnum;
	children: ReactNode | ReactNode[] | string;
	justify?: FlexJustifyEnum;
	align?: FlexAlignEnum;
	centered?: boolean;
	[x: string]: any;
}

const DIRECTIONS = {
	horizontal: "row",
	vertical: "column",
};

const Flex: FC<FlexProps> = ({ direction, justify, align, centered, children, ...rest }) => {
	return (
		<Box
			{...rest}
			display='flex'
			justifyContent={centered ? "center" : justify}
			alignItems={centered ? "center" : align}
			flexDirection={DIRECTIONS[direction]}
			color='var(--text)'
		>
			{children}
		</Box>
	);
};

export default Flex;
