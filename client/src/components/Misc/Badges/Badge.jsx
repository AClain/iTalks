import PropTypes from "prop-types";

import { Box } from "@chakra-ui/react";
import { Image, Tooltip } from "@chakra-ui/react";

const Badge = ({ badge }) => {
	return (
		<Tooltip label={badge.name} placement='top' hasArrow fontSize='18px'>
			<Box m='5px' h='50px' w='50px'>
				<Image src={badge.resource} />
			</Box>
		</Tooltip>
	);
};

Badge.propTypes = {
	badge: PropTypes.object.isRequired,
};

export default Badge;
