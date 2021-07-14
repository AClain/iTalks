import { FC } from "react";

import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexAlignEnum, FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { IconButton, Typography } from "@material-ui/core";
import { HiChevronDoubleDown, HiChevronDoubleUp, HiChevronDown, HiChevronUp } from "react-icons/hi";

export interface VoteCountProps {
	votes: number;
	positive: boolean | null;
}

const VoteCount: FC<VoteCountProps> = ({ votes, positive }) => {
	return (
		<Flex direction={FlexDirectionEnum.Horizontal} align={FlexAlignEnum.Center}>
			<IconButton style={{ color: "var(--text)" }} size='medium'>
				{positive ? <HiChevronDoubleUp color='var(--success)' /> : <HiChevronUp />}
			</IconButton>
			<Typography>{votes}</Typography>
			<IconButton style={{ color: "var(--text)" }} size='medium'>
				{!positive && positive !== null ? <HiChevronDoubleDown color='var(--danger)' /> : <HiChevronDown />}
			</IconButton>
		</Flex>
	);
};

export default VoteCount;
