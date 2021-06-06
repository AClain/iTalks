import PropTypes from "prop-types";

// Component library
import { Button } from "@chakra-ui/react";

const CUSTOM_TYPE = {
	global: {
		background: "var(--purple)",
		hover: "var(--purple-focus)",
	},
	info: {
		background: "var(--info)",
		hover: "var(--info-focus)",
	},
	warning: {
		background: "var(--warning)",
		hover: "var(--warning-focus)",
	},
	danger: {
		background: "var(--danger)",
		hover: "var(--danger-focus)",
	},
};

const CUSTOM_SIZE = {
	sm: {
		fontSize: "16px",
	},
	md: {
		fontSize: "20px",
	},
	lg: {
		fontSize: "24px",
	},
};

const CustomButton = ({ customType, customSize, children, ...rest }) => {
	return (
		<Button
			bg={CUSTOM_TYPE[customType].background}
			_hover={{ background: CUSTOM_TYPE[customType].hover }}
			fontSize={CUSTOM_SIZE[customSize].fontSize}
			w='max-content'
			p='1em 1.75em'
			fontFamily='Roboto Black'
			color='var(--text)'
			_active={{ tranform: "scale(0.95)" }}
			{...rest}>
			{children}
		</Button>
	);
};

CustomButton.propTypes = {
	customType: PropTypes.string,
	customSize: PropTypes.string,
	children: PropTypes.string,
};

CustomButton.defaultProps = {
	customType: "global",
	customSize: "md",
};

export default CustomButton;
