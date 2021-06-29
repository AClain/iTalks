import PropTypes from "prop-types";

import { Box, Flex } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";

import Badge from "./Badge";

const BadgeList = ({ badges }) => {
	return (
		<Box w='100%' my='25px' boxShadow='var(--small-box-shadow)'>
			<Heading as='h2' size='md' bg='#171923' p='5px 0px 10px 10px' borderTopRadius='5px'>
				Badges
			</Heading>
			<Flex p='15px' bg='#1A202C'>
				{badges.length > 0 ? (
					badges.map((b, i) => <Badge badge={b} key={i} />)
				) : (
					<Text fontStyle='italic'> Aucun badge possédé</Text>
				)}
			</Flex>
		</Box>
	);
};

BadgeList.propTypes = {
	badges: PropTypes.array.isRequired,
};

export default BadgeList;
