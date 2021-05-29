import PropTypes from "prop-types";

import { Flex, forwardRef } from "@chakra-ui/react";

const AvatarPicture = ({ user, usesUsername, ref }) => {
	return (
		<Flex
			w='200px'
			h='200px'
			bgColor='main.purple'
			borderRadius='50%'
			alignItems='center'
			justifyContent='center'
			backgroundPosition='center'
			backgroundSize='cover'
			backgroundRepeat='no-repeat'
			backgroundImage={user.avatar ? "url('" + user.avatar.link + "')" : null}
			fontSize={55}
			ref={ref}
			m='15px 0px'
			overflow='hidden'>
			{usesUsername ? user.username.substring(0, 1).toUpperCase() : null}
		</Flex>
	);
};

AvatarPicture.propTypes = {
	user: PropTypes.object.isRequired,
	usesUsername: PropTypes.bool,
	ref: PropTypes.object,
};

AvatarPicture.defaultProps = {
	usesUsername: false,
};

export default forwardRef(AvatarPicture);
