import { Flex, forwardRef } from "@chakra-ui/react";

function AvatarPicture(props, ref) {
  return (
    <Flex
      w="200px"
      h="200px"
      bgColor="main.purple"
      borderRadius="50%"
      alignItems="center"
      justifyContent="center"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundImage={
        props.user.avatar ? 'url("' + props.user.avatar.link + '")' : null
      }
      fontSize={55}
      ref={ref}
      m="15px 0px"
      overflow="hidden"
    >
      {props.usesUsername
        ? props.user.username.substring(0, 1).toUpperCase()
        : null}
    </Flex>
  );
}

export default forwardRef(AvatarPicture);
