import React from "react";

import { Box, Flex } from "@chakra-ui/react";
import SidebarIcon from "./SidebarIcon";

export default function IconWithBadge(props) {
  return (
    <Box position="relative">
      <SidebarIcon active={props.active} icon={props.icon} />
      {props.badgeNumber > 0 ? (
        <Flex
          h="23px"
          w="23px"
          color="white"
          position="absolute"
          top="-8px"
          right="-8px"
          bgColor="#E53E3E"
          align="center"
          justify="center"
          borderRadius="50%"
          fontSize="15px"
          fontFamily="Roboto Light"
        >
          {props.badgeNumber < 9 ? props.badgeNumber : "9+"}
        </Flex>
      ) : null}
    </Box>
  );
}
