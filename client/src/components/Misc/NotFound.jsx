import { Flex } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Button, Icon } from "@chakra-ui/react";

import { HiOutlineHome } from "react-icons/hi";
import LinkTo from "./LinkTo";

export default function NotFound() {
  return (
    <Flex
      color="var(--text)"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Heading as="h2" fontSize={150}>
        404
      </Heading>
      <Heading as="h2" fontSize="5xl">
        Page introuvable
      </Heading>{" "}
      <LinkTo to="/">
        <Button
          leftIcon={<Icon as={HiOutlineHome} />}
          colorScheme="teal"
          variant="link"
          mt="50px"
        >
          Retour à l'accueil
        </Button>
      </LinkTo>
    </Flex>
  );
}
