import React from "react";

import { HStack, Center, Spacer } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

import LinkTo from "../Misc/LinkTo";

export default function Header() {
  return (
    <HStack p="20px 10px">
      <Heading
        as="h1"
        w="10%"
        fontSize="24px"
        fontFamily="Roboto Bold"
        textAlign="center"
      >
        Header
      </Heading>
      <Spacer />
      <Center w="50%" justifyContent="space-evenly">
        <LinkTo to="/">Home</LinkTo>
        <LinkTo to="/topics">Topics</LinkTo>
        <LinkTo to="/other">Other</LinkTo>
      </Center>
      <Spacer />
    </HStack>
  );
}
