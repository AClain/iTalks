import { Flex } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Button, Icon } from "@chakra-ui/react";

import { HiShieldExclamation } from "react-icons/hi";
import LinkTo from "../Misc/LinkTo";

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
        Resource introuvable
      </Heading>{" "}
      <LinkTo to="/admin/users">
        <Button
          leftIcon={<Icon as={HiShieldExclamation} />}
          colorScheme="teal"
          variant="link"
          mt="50px"
        >
          Retour au tableau de bord
        </Button>
      </LinkTo>
    </Flex>
  );
}
