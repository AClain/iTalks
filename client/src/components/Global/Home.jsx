import React from "react";

import { Heading } from "@chakra-ui/react";

import TopContainer from "../Misc/TopContainer";

export default function Home() {
  return (
    <TopContainer alignItems="center">
      <Heading as="h1">Home</Heading>
    </TopContainer>
  );
}
