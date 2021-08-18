// React
import { FC, ReactElement } from "react";
// Material ui
import { Box } from "@material-ui/core";

declare interface TopContainerProps {
	sidebar?: ReactElement;
	page: ReactElement;
	sideMargin?: number;
}

const TopContainer: FC<TopContainerProps> = ({ sidebar, page, sideMargin }) => {
	const margin = sideMargin ? "50px " + sideMargin + "px" : "50px";
	return (
		<Box display='flex' height='100%' width='100%'>
			{sidebar}
			<Box style={{ overflowY: "auto" }} display='flex' p={margin} flexGrow={1}>
				{page}
			</Box>
		</Box>
	);
};

export default TopContainer;
