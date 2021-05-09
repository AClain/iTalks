import { useEffect, useState, useContext } from "react";

import { GlobalContext } from "../../../providers/GlobalContext";

import { useParams } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import moment from "moment";

import AdminRequest from "../../../api/AdminRequests";

import { Box, Flex, Stack, HStack } from "@chakra-ui/layout";
import { Heading, Text } from "@chakra-ui/layout";
import { Icon, Badge, Spinner } from "@chakra-ui/react";
import { Spacer } from "@chakra-ui/react";

import TopContainer from "../../Misc/TopContainer";
import AvatarPicture from "../../Misc/AvatarPicture";

import {
  HiChat,
  HiBadgeCheck,
  HiCake,
  HiShieldExclamation,
  HiPencil,
  HiLightningBolt,
} from "react-icons/hi";

import BackButton from "../../Misc/BackButton";

export default function UserEdit() {
  // Router params
  let { username } = useParams();

  // Context
  const { alert, setAlert } = useContext(GlobalContext);

  // States
  const [usesUsername, setUsesUsername] = useState(true);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState({ status: false, message: null });

  useEffect(() => {
    AdminRequest.getUserByUsername(username)
      .then((data) => {
        if (data.status === 201) {
          setUser(data.data.user);
          setUsesUsername(data.data.user.avatar !== null ? false : true);
          setTimeout(() => {
            setLoading(false);
          }, 500);
          return true;
        } else if (data.status === 400) {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }

        return false;
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setNotFound({ status: true, message: err.response.data.message });
          setTimeout(() => {
            setLoading(false);
          }, 500);
          return false;
        }
        setAlert({
          ...alert,
          message: "500: Erreur serveur. Veuillez réessayer.",
          status: "error",
          shouldDisplay: true,
        });
        return false;
      });
    return () => {};
  }, [username]);

  return (
    <TopContainer alignItems="center">
      <Helmet>
        <title>iTalks - Administration - Information sur l'utilisateur</title>
      </Helmet>

      <HStack m="35px 0px" w="90%">
        <BackButton />

        <Heading textAlign="center" as="h2" w="max-content" p="0px 15px">
          Information sur l'utilisateur
        </Heading>
      </HStack>

      {loading ? (
        <Stack alignItems="center">
          <Text as="h4" fontSize={25} fontStyle="italic" m="15px 0px">
            Chargement des informations ...
          </Text>
          <Spinner
            color="var(--text)"
            size="xl"
            label="Chargement"
            thickness="5px"
          />
        </Stack>
      ) : notFound.status === false ? (
        <Flex direction="row" w="90%">
          <Box
            width="70%"
            boxShadow="0px 0px 5px rgba(0, 0, 0, 0.25)"
            bgColor="rgba(57, 62, 70, 0.5)"
            borderRadius="5px"
            p="15px"
          ></Box>
          <Spacer />
          <Box
            width="25%"
            minW="300px"
            boxShadow="0px 0px 5px rgba(0, 0, 0, 0.25)"
            bgColor="rgba(57, 62, 70, 0.5)"
            borderRadius="5px"
            p="15px"
          >
            <Flex m="25px 0px" direction="column" alignItems="center">
              <AvatarPicture user={user} usesUsername={usesUsername} />

              <HStack
                w="100%"
                fontSize={15}
                justifyContent="center"
                alignItems="center"
                mb="25px"
              >
                <Text fontFamily="Roboto Black" fontStyle="italic">
                  {user.username}
                </Text>
                {user.role.id === 2 ? (
                  <>
                    <Icon fontSize={20} color="red.500" as={HiLightningBolt} />
                    <Badge variant="outline" colorScheme="red">
                      admin
                    </Badge>
                  </>
                ) : user.role.id === 3 ? (
                  <>
                    <Icon
                      fontSize={20}
                      color="green.500"
                      as={HiShieldExclamation}
                    />
                    <Badge variant="outline" colorScheme="green">
                      modérateur
                    </Badge>
                  </>
                ) : user.role.id === 4 ? (
                  <>
                    <Icon fontSize={20} color="blue.500" as={HiBadgeCheck} />
                    <Badge variant="outline" colorScheme="blue">
                      entreprise
                    </Badge>
                  </>
                ) : null}
              </HStack>

              <HStack
                w="100%"
                borderLeft="solid 5px lightgreen"
                p="0px 5px"
                m="5px 0px"
                opacity="0.7"
                justifyContent="flex-start"
              >
                <Icon as={HiCake} fontSize={20} />
                <Text fontFamily="Roboto Light">
                  À rejoint en{" "}
                  {moment(new Date(user.created_at)).format("MMMM YYYY")}
                </Text>
              </HStack>

              <HStack
                w="100%"
                borderRight="solid 5px darkorchid"
                p="0px 5px"
                m="5px 0px"
                opacity="0.7"
                justifyContent="flex-end"
              >
                <Icon as={HiPencil} fontSize={20} />
                <Text fontFamily="Roboto Light">11 post</Text>
              </HStack>

              <HStack
                w="100%"
                borderRight="solid 5px darkorchid"
                p="0px 5px"
                m="5px 0px"
                opacity="0.7"
                justifyContent="flex-end"
              >
                <Icon as={HiChat} fontSize={20} />
                <Text fontFamily="Roboto Light">57 commentaires</Text>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      ) : (
        <Heading as="h2" fontSize="5xl">
          {notFound.message}
        </Heading>
      )}
    </TopContainer>
  );
}
