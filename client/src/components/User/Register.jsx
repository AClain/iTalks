import { Box, HStack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

import TopContainer from "../Misc/TopContainer";

function Register() {
  return (
    <TopContainer>
      <HStack w="100vw">
        <Box w="50%">
          <Image boxSize="100px" objectFit="cover" src="" alt="Segun Adebayo" />
        </Box>
        <Box>
          <h1>Register</h1>
        </Box>
      </HStack>
    </TopContainer>
  );
}

export default Register;
