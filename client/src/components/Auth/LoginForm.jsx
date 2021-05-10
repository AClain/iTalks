import { useState } from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  Input,
  Button,
  Switch,
  InputRightAddon,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { Stack, HStack, Flex } from "@chakra-ui/react";
import { Image, Text } from "@chakra-ui/react";

import { HiEye, HiEyeOff } from "react-icons/hi";

import CustomInput from "../Misc/CustomInput";

import auth from "../../api/Auth";

const LoginForm = () => {
  const [usingEmail, setUsingEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <HStack h="100%">
      <Flex
        h="100%"
        w="50%"
        justifyContent="center"
        alignItems="center"
        bg="var(--text)"
      >
        <Image
          w="150px"
          h="150px"
          src="/assets/images/italks-logo-transparent.png"
        />
      </Flex>
      <Stack
        w="50%"
        justifyContent="center"
        alignItems="center"
        bg="transparent"
        p="0px 15px"
        m="none"
      >
        <input
          type="hidden"
          name="type"
          value={usingEmail ? "email" : "username"}
        />
        <CustomInput
          id="username"
          isRequired={true}
          label={usingEmail ? "Adresse email" : "Nom d'utilisateur"}
          type="text"
          name="identifier"
          placeholder={usingEmail ? "Adresse email" : "Nom d'utilisateur"}
        >
          <HStack mt="10px">
            <Switch
              onChange={() => {
                setUsingEmail(!usingEmail);
              }}
              size="sm"
            />
            <Text>Se connecter avec votre nom d'utilisateur</Text>
          </HStack>
        </CustomInput>
        <CustomInput
          id="password"
          isRequired={true}
          label="Mot de passe"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Mot de passe"
          rightIcon={
            <InputRightElement
              children={
                <Icon
                  as={showPassword ? HiEye : HiEyeOff}
                  color="var(--text)"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  _hover={{ cursor: "pointer" }}
                />
              }
            />
          }
        />
      </Stack>
    </HStack>
  );
};

export default LoginForm;
