import PropTypes from "prop-types";

import { Flex } from "@chakra-ui/react";

const TopContainer = ({ children, ...rest }) => {
	return (
		<Flex color='#F1F1F1' maxW='100%' direction='column' p='50px 50px 50px 100px' {...rest}>
			{children}
		</Flex>
	);
};

TopContainer.propTypes = {
	children: PropTypes.element.isRequired,
};

export default TopContainer;
