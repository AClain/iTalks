import React from "react";

import { Flex } from "@chakra-ui/react";

export default function TopContainer(props) {
  return (
    <Flex
      color="#F1F1F1"
      maxW="100%"
      direction="column"
      p="50px 50px 50px 100px"
      {...props}
    >
      {props.children}
    </Flex>
  );
}
