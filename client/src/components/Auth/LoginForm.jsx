import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  Input,
} from "@chakra-ui/react";
import { Flex, HStack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

const LoginForm = () => {
  return (
    <HStack>
      <Image />
      <Flex>
        <h1>Login</h1>
      </Flex>
    </HStack>
  );
};

export default LoginForm;
