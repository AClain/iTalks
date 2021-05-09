import { useState } from "react";

import { Box, HStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  Select,
  FormHelperText,
  InputLeftElement,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { UnorderedList, ListItem } from "@chakra-ui/react";

import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export default function UserEditForm(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <HStack m="25px 0px" alignItems="flex-start">
        <FormControl id="email">
          <FormLabel>
            Adresse email{" "}
            <sup>
              <b>*</b>
            </sup>
          </FormLabel>
          <Input
            type="email"
            name="email"
            defaultValue={props.user.email}
            ref={props.register({
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            })}
          />
          <FormHelperText>
            {props.errors.email && props.errors.email.type === "required" && (
              <Text color="red.500">Requis</Text>
            )}
            {props.errors.email && props.errors.email.type === "pattern" && (
              <Text color="red.500">
                Veuillez indiquer une adresse email correcte
              </Text>
            )}
          </FormHelperText>
        </FormControl>

        <FormControl id="username">
          <FormLabel>
            Nom d'utilisateur{" "}
            <sup>
              <b>*</b>
            </sup>
          </FormLabel>
          <InputGroup>
            <InputLeftAddon
              color="main.dark"
              borderColor="var(--text)"
              children="@"
            />
            <Input
              type="text"
              name="username"
              defaultValue={props.user.username}
              ref={props.register({
                minLength: 3,
                maxLength: 25,
              })}
            />
          </InputGroup>
          <FormHelperText>
            {props.errors.username &&
              props.errors.username.type === "required" && (
                <Text color="red.500">Requis</Text>
              )}
            {props.errors.username &&
              (props.errors.username.type === "minLength" ||
                props.errors.username.type === "maxLength") && (
                <Text color="red.500">
                  Le nom d'utilisateur doit faire entre 3 et 25 caractères
                </Text>
              )}
          </FormHelperText>
        </FormControl>
      </HStack>
      <HStack w="50%" m="25px 0px" alignItems="flex-start">
        <FormControl id="password">
          <FormLabel>
            Mot de passe{" "}
            <sup>
              <b>*</b>
            </sup>
          </FormLabel>
          <InputGroup size="md">
            <InputLeftElement
              onClick={() => {
                setShow(!show);
              }}
              cursor="pointer"
              children={
                show ? (
                  <Icon as={HiOutlineEyeOff} />
                ) : (
                  <Icon as={HiOutlineEye} />
                )
              }
            />
            <Input
              type={show ? "text" : "password"}
              name="password"
              ref={props.register({
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/g,
              })}
            />
          </InputGroup>
          <FormHelperText>
            {props.errors.password &&
              props.errors.password.type === "required" && (
                <Text color="red.500">Requis</Text>
              )}
            {props.errors.password && props.errors.password.type === "pattern" && (
              <Box color="red.500">
                <Text>Le mot de passe:</Text>
                <UnorderedList>
                  {props
                    .watch("password")
                    .match(/^[A-Za-z\d@$!%*?&]{8,30}$/g) ? null : (
                    <ListItem>doit contenir entre 8 et 30 caractères</ListItem>
                  )}
                  {props
                    .watch("password")
                    .match(/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/g) ? null : (
                    <ListItem>au moins un caractère spécial</ListItem>
                  )}
                  {props
                    .watch("password")
                    .match(/^(?=.*\d)[A-Za-z\d@$!%*?&]{1,}$/g) ? null : (
                    <ListItem>au moins un chiffre</ListItem>
                  )}
                  {props
                    .watch("password")
                    .match(/^(?=.*[A-Z])[A-Za-z\d@$!%*?&]{1,}$/g) ? null : (
                    <ListItem>au moins une lettre majuscule</ListItem>
                  )}
                  {props
                    .watch("password")
                    .match(/^(?=.*[a-z])[A-Za-z\d@$!%*?&]{1,}$/g) ? null : (
                    <ListItem>au moins une lettre minuscule</ListItem>
                  )}
                </UnorderedList>
              </Box>
            )}
          </FormHelperText>
        </FormControl>
      </HStack>
      <HStack m="25px 0px" alignItems="flex-start">
        <FormControl id="role">
          <FormLabel>
            Role{" "}
            <sup>
              <b>*</b>
            </sup>
          </FormLabel>
          <Select
            size="sm"
            color="#222831"
            borderColor="var(--text)"
            bgColor="var(--text)"
            name="role"
            ref={props.register({ required: true })}
            defaultValue={props.user.role ? props.user.role.name : "basic"}
          >
            <option value="admin">Admin</option>
            <option value="modérateur">Modérateur</option>
            <option value="entreprise">Entreprise</option>
            <option value="utilisateur">Utilisateur</option>
          </Select>
          <FormHelperText>
            {props.errors.role && props.errors.status.role === "required" && (
              <Text color="red.500">Requis</Text>
            )}
          </FormHelperText>
        </FormControl>
        <FormControl id="status">
          <FormLabel>
            Statut{" "}
            <sup>
              <b>*</b>
            </sup>
          </FormLabel>
          <Select
            size="sm"
            color="#222831"
            borderColor="var(--text)"
            bgColor="var(--text)"
            name="status"
            ref={props.register({ required: true })}
            defaultValue={props.user.status ? props.user.status.name : "active"}
          >
            <option value="actif">Actif</option>
            <option value="retiré">Retiré</option>
            <option value="supprimé">Supprimé</option>
          </Select>
          <FormHelperText>
            {props.errors.status && props.errors.status.type === "required" && (
              <Text color="red.500">Requis</Text>
            )}
          </FormHelperText>
        </FormControl>
      </HStack>
    </>
  );
}
