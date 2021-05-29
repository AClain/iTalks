import PropTypes from "prop-types";

import { Box, Flex } from "@chakra-ui/react";
import SidebarIcon from "./SidebarIcon";

const IconWithBadge = ({ active, icon, badgeNumber }) => {
	return (
		<Box position='relative'>
			<SidebarIcon active={active} icon={icon} />
			{badgeNumber > 0 && (
				<Flex
					h='23px'
					w='23px'
					color='white'
					position='absolute'
					top='-8px'
					right='-8px'
					bgColor='#E53E3E'
					align='center'
					justify='center'
					borderRadius='50%'
					fontSize='15px'
					fontFamily='Roboto Light'>
					{badgeNumber < 9 ? badgeNumber : "9+"}
				</Flex>
			)}
		</Box>
	);
};

IconWithBadge.propTypes = {
	active: PropTypes.bool,
	icon: PropTypes.element.isRequired,
	badgeNumber: PropTypes.number,
};

IconWithBadge.defaultProps = {
	active: false,
	badgeNumber: 0,
};

export default IconWithBadge;
