import React from "react";

import { Icon } from "@chakra-ui/react";

export default function SidebarIcon(props) {
  return (
    <Icon
      _hover={{
        stroke: "#9E58CD",
        color: "#9E58CD",
      }}
      stroke={props.active ? "#9E58CD" : "#F1F1F1"}
      color={props.active ? "#9E58CD" : "#F1F1F1"}
      transitionDuration="0.2s"
      w={8}
      h={8}
      as={props.icon}
    />
  );
}
