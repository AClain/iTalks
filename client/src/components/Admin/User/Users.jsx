import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../../providers/GlobalContext";
import { Helmet } from "react-helmet-async";
import AdminRequest from "../../../api/AdminRequests";

import { Box, Stack, HStack, Flex } from "@chakra-ui/react";
import { Heading, Text, Badge } from "@chakra-ui/layout";
import { Select, Button } from "@chakra-ui/react";
import { Table, Tbody } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import LinkTo from "../../Misc/LinkTo";
import TopContainer from "../../Misc/TopContainer";

import "./styles/users.css";
import THeadCustom from "../../Misc/THeadCustom";
import TBodyUser from "./TBodyUser";
import CustomModal from "../../Misc/CustomModal";

export default function Users() {
  // Context
  const { alert, setAlert } = useContext(GlobalContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // States
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState(0);
  const [sending, setSending] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const deleteUser = () => {
    setSending(true);
    AdminRequest.delete(userToDelete)
      .then((data) => {
        setSending(false);
        onClose();
        if (data.status === 201) {
          setAlert({
            ...alert,
            message: data.data.message,
            status: "success",
            shouldDisplay: true,
          });
          setRefresh(!refresh);
          return true;
        }
        setAlert({
          ...alert,
          message: "500: Erreur serveur. Veuillez réessayer.",
          status: "error",
          shouldDisplay: true,
        });
        return false;
      })
      .catch((err) => {
        setSending(false);
        onClose();
        if (err.response.status === 400) {
          // ?
          return false;
        }
        setAlert({
          ...alert,
          message: "500: Erreur serveur. Veuillez réessayer.",
          status: "error",
          shouldDisplay: true,
        });
      });
  };

  // Effects
  useEffect(() => {
    AdminRequest.getAllUsers()
      .then((data) => {
        if (data.status === 201) {
          setUsers(data.data.users);
          setTimeout(() => {
            setLoading(false);
          }, 500);
          return true;
        }
        setAlert({
          ...alert,
          message: "500: Erreur serveur. Veuillez réessayer.",
          status: "error",
          shouldDisplay: true,
        });
        return false;
      })
      .catch((err) => {
        setAlert({
          ...alert,
          message: "500: Erreur serveur. Veuillez réessayer.",
          status: "error",
          shouldDisplay: true,
        });
        console.log(err);
      });
    return () => {};
  }, [refresh]);

  return (
    <TopContainer alignItems="center">
      <Helmet>
        <title>iTalks - Administration - Liste des utilisateurs</title>
      </Helmet>
      <CustomModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onConfirmClick={deleteUser}
        sending={sending}
        headerText="Suppression d'un utilisateur"
        bodyText="Êtes-vous sur de vouloir supprimer cet utilisateur ?"
        closeText="Annuler"
        confirmText="Supprimer"
        confirmColor="red"
      />
      <Heading as="h2" m="35px 0px" color="var(--text)">
        Administration
      </Heading>
      <Box
        width="90%"
        boxShadow="var(--medium-box-shadow)"
        bgColor="var(--bg-no-opacity)"
        color="var(--text)"
        borderRadius="5px"
        p="15px"
      >
        <HStack textAlign="left" w="100%" mb="15px">
          <Flex justifyContent="space-between" alignItems="center" w="100%">
            <HStack>
              <Text minW="max-content" m="0px 5px">
                Gérer les
              </Text>
              <Select
                color="var(--text)"
                borderColor="var(--bg)"
                bgColor="var(--bg)"
                defaultChecked="users"
                w="250px"
              >
                <option value="users">Utilisateurs</option>
                <option value="roles">Roles</option>
                <option value="statuses">Statuts</option>
              </Select>
            </HStack>
            <LinkTo to="/admin/user/create" underline={false}>
              <Button
                textAlign="right"
                borderColor="var(--info)"
                color="var(--info)"
                _hover={{
                  bgColor: "var(--info)",
                  color: "var(--light)",
                }}
                variant="outline"
              >
                Ajouter
              </Button>
            </LinkTo>
          </Flex>
        </HStack>
        <Stack overflowX="auto" overflowY="hidden" justifyContent="center">
          <Table bgColor="var(--bg-no-opacity)">
            <THeadCustom
              titles={[
                "#",
                "statut",
                "role",
                "@",
                "email",
                "date de création",
                "avatar",
                "actions",
              ]}
            />
            {loading ? null : (
              <Tbody>
                {users.map((user, i) => (
                  <TBodyUser
                    user={user}
                    onOpen={onOpen}
                    setUserToDelete={setUserToDelete}
                    key={i}
                  />
                ))}
              </Tbody>
            )}
          </Table>
          {loading ? (
            <Flex justifyContent="center">
              <Spinner
                color="var(--text)"
                size="xl"
                label="Chargement"
                thickness="5px"
              />
            </Flex>
          ) : users.length > 0 ? null : (
            <Flex justifyContent="center">
              <Text fontSize="2xl" fontFamily="Roboto Thin" fontStyle="italic">
                Aucun utilisateur enregistré.
              </Text>
            </Flex>
          )}
        </Stack>
      </Box>
    </TopContainer>
  );
}
