import { ChangeEvent, FC } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { ceil, floor } from "lodash";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum, FlexJustifyEnum } from "components/Elements/Layout/Flex/Flex.d";
import { useStyles } from "./Paginate.styles";

interface PaginateProps {
	page: number;
	total: number;
	limit: number;
	action: (event: ChangeEvent<unknown>, page: number) => void;
	[x: string]: any;
}

const Paginate: FC<PaginateProps> = ({ page, total, limit, action, ...rest }): JSX.Element | null => {
	const styles = useStyles();

	return floor(total / limit) > 1 ? (
		<Flex direction={FlexDirectionEnum.Horizontal} justify={FlexJustifyEnum.Center} fullWidth {...rest}>
			<Pagination
				page={page}
				showFirstButton={page > 10}
				showLastButton={page < floor(total / limit) - 9}
				size='medium'
				variant='outlined'
				className={styles.root}
				onChange={action}
				count={ceil(total / limit)}
			/>
		</Flex>
	) : null;
};

export default Paginate;
