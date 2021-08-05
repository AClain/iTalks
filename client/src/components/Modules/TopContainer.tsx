// React
import { FC, ReactElement } from "react";
// Material ui
import { Box } from "@material-ui/core";

declare interface TopContainerProps {
	sidebar?: ReactElement;
	page: ReactElement;
}

const TopContainer: FC<TopContainerProps> = ({ sidebar, page }) => {
	return (
		<Box display='flex' height='100%' width='100%'>
			{sidebar}
			<Box display='flex' m='50px' flexGrow={1}>
				{page}
			</Box>
		</Box>
	);
};

export default TopContainer;
