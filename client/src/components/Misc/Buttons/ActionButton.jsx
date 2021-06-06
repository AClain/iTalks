import PropTypes from "prop-types";

import { IconButton, Icon, Tooltip } from "@chakra-ui/react";
import LinkTo from "../LinkTo";

const ActionButton = ({ color, title, icon, hoverBgColor, onClick, linkExternal, link, tooltip }) => {
	return (
		<LinkTo to={link ?? "#"} external={linkExternal}>
			<Tooltip hasArrow label={tooltip} placement='top'>
				<span>
					<IconButton
						title={title}
						variant='ghost'
						fontSize={20}
						m='0px 2px'
						color={color}
						icon={<Icon as={icon} />}
						onClick={onClick}
						_hover={{ background: hoverBgColor, color: "var(--light)" }}
					/>
				</span>
			</Tooltip>
		</LinkTo>
	);
};

ActionButton.propTypes = {
	color: PropTypes.string,
	title: PropTypes.string,
	icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	tooltip: PropTypes.string,
	hoverBgColor: PropTypes.string,
	onClick: PropTypes.func,
	linkExternal: PropTypes.bool,
	link: PropTypes.string,
};

ActionButton.defaultProps = {
	color: "var(--info)",
	title: "Action",
	hoverBgColor: "var(--info-focus)",
};

export default ActionButton;
