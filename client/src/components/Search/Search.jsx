import React from "react";

import { Heading } from "@chakra-ui/react";

import TopContainer from "../Misc/TopContainer";

export default function Search() {
  return (
    <TopContainer alignItems="center">
      <Heading as="h1">Rechercher</Heading>
    </TopContainer>
  );
}
