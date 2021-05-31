import PropTypes from "prop-types";

import { Icon } from "@chakra-ui/react";

const SidebarIcon = ({ active, icon }) => {
	return (
		<Icon
			_hover={{
				stroke: "#9E58CD",
				color: "#9E58CD",
			}}
			stroke={active ? "#9E58CD" : "var(--text)"}
			color={active ? "#9E58CD" : "var(--text)"}
			transitionDuration='0.2s'
			w={8}
			h={8}
			as={icon}
		/>
	);
};

SidebarIcon.propTypes = {
	active: PropTypes.bool,
	icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

SidebarIcon.defaultProps = {
	active: false,
};

export default SidebarIcon;
