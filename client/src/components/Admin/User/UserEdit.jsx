import { useEffect, useState, useRef, useContext } from "react";

import { GlobalContext } from "../../../providers/GlobalContext";

import { useParams, useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";

import { Helmet } from "react-helmet-async";

import AdminRequest from "../../../api/AdminRequests";

import { Box, Flex, HStack, Stack } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";
import {
  IconButton,
  Button,
  Alert,
  AlertIcon,
  Spinner,
} from "@chakra-ui/react";
import { Icon, Spacer } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import TopContainer from "../../Misc/TopContainer";

import { HiOutlineX, HiUpload, HiOutlineSave } from "react-icons/hi";
import CustomModal from "../../Misc/CustomModal";
import BackButton from "../../Misc/BackButton";
import UserEditForm from "./forms/UserEditForm";
import AvatarPicture from "../../Misc/AvatarPicture";

export default function UserEdit() {
  // Router params
  let { username } = useParams();
  let history = useHistory();

  // Context
  const { alert, setAlert } = useContext(GlobalContext);

  // Refs
  const inputRef = useRef();
  const imageRef = useRef();

  // States
  const [user, setUser] = useState([]);
  const [newAvatar, setNewAvatar] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [usesUsername, setUsesUsername] = useState(true);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [notFound, setNotFound] = useState({ status: false, message: null });

  // Chakra
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Form hook
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (userData) => {
    setSending(true);
    AdminRequest.update(username, userData)
      .then((data) => {
        setSending(false);
        if (data.status === 201) {
          setAlert({
            ...alert,
            message: data.data.message,
            status: "success",
            shouldDisplay: true,
          });
          setUser(data.data.user);
          setUsesUsername(data.data.user.avatar !== null ? false : true);
          setServerErrors([]);
          history.replace("/admin/user/" + data.data.user.username + "/edit");
          username = data.data.user.username;
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
        console.log(err.response);
        if (err.response && err.response.status === 400) {
          setServerErrors(err.response.data.errors);
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
  };

  const loadFile = (e) => {
    setUsesUsername(false);
    setNewAvatar(true);

    var reader = new FileReader();
    reader.onload = function (e) {
      imageRef.current.style.backgroundImage = 'url("' + e.target.result + '")';
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateAvatar = () => {
    setSending(true);
    AdminRequest.updateAvatar(username, inputRef.current)
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
          setUsesUsername(false);
          setNewAvatar(false);
          setUser(data.data.user);
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
        console.log(err.response);
        setSending(false);
        onClose();
        if (err.response && err.response.status === 400) {
          setServerErrors(err.response.data.errors);
          return false;
        } else if (err.response && err.response.status === 500) {
          setAlert({
            ...alert,
            message: err.response.data.message,
            status: "error",
            shouldDisplay: true,
          });
        }
        setAlert({
          ...alert,
          message: "500: Erreur serveur. Veuillez réessayer.",
          status: "error",
          shouldDisplay: true,
        });
        return false;
      });
  };

  const deleteAvatar = () => {
    setSending(true);
    AdminRequest.deleteAvatar(username)
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
          setUsesUsername(true);
          setUser({ ...user, avatar: null });
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
        if (err.response && err.response.status === 400) {
          setServerErrors(err.response.data.errors);
          return false;
        } else if (err.response && err.response.status === 500) {
          setAlert({
            ...alert,
            message: err.response.data.message,
            status: "error",
            shouldDisplay: true,
          });
        }
        setAlert({
          ...alert,
          message: "500: Erreur serveur. Veuillez réessayer.",
          status: "error",
          shouldDisplay: true,
        });
        return false;
      });
  };

  // Effects
  useEffect(() => {
    AdminRequest.getUserByUsername(username)
      .then((data) => {
        if (data.status === 201) {
          setUser(data.data.user);
          setUsesUsername(data.data.user.avatar === null);
          setTimeout(() => {
            setLoading(false);
          }, 500);
          return true;
        } else if (data.status === 400) {
          setServerErrors(data.data.errors);
          setTimeout(() => {
            setLoading(false);
          }, 500);
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
      });
    return () => {};
  }, [username]);

  return (
    <TopContainer alignItems="center">
      <Helmet>
        <title>iTalks - Administration - Mettre à jour l'utilisateur</title>
      </Helmet>

      <CustomModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onConfirmClick={deleteAvatar}
        sending={sending}
        headerText="Suppression de l'avatar"
        bodyText="Êtes-vous sur de vouloir supprimer l'avatar de cet utilisateur ?"
        closeText="Annuler"
        confirmText="Supprimer"
        confirmColor="red"
      />

      <HStack m="35px 0px" w="90%">
        <BackButton />

        <Heading textAlign="center" as="h2" w="max-content" p="0px 15px">
          Mettre à jour l'utilisateur
        </Heading>
      </HStack>

      {loading ? (
        <Stack alignItems="center">
          <Text as="h4" fontSize={25} fontStyle="italic" m="15px 0px">
            Chargement des informations ...
          </Text>
          <Spinner
            color="main.light"
            size="xl"
            label="Chargement"
            thickness="5px"
          />
        </Stack>
      ) : notFound.status === false ? (
        <form style={{ width: "90%" }} onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="row" w="100%">
            <Box
              width="70%"
              boxShadow="0px 0px 5px rgba(0, 0, 0, 0.25)"
              bgColor="rgba(57, 62, 70, 0.5)"
              borderRadius="5px"
              p="15px"
            >
              <Alert status="info" m="10px 0px" color="main.dark">
                <AlertIcon />
                <b>*</b>&nbsp;Champ requis
              </Alert>

              {Object.values(serverErrors).length > 0
                ? Object.values(serverErrors).map((message, i) => (
                    <Alert
                      key={i}
                      status="error"
                      m="10px 0px"
                      color="main.dark"
                    >
                      <AlertIcon />
                      <Text color="red.500">{message}</Text>
                    </Alert>
                  ))
                : null}

              <UserEditForm
                user={user}
                errors={errors}
                register={register}
                watch={watch}
              />

              <Button
                color="main.light"
                _hover={{
                  backgroundColor: "main.purple",
                  borderColor: "main.purple",
                }}
                variant="outline"
                type="submit"
                isLoading={sending}
              >
                Mettre à jour
              </Button>
            </Box>

            <Spacer />

            <Box
              width="25%"
              boxShadow="0px 0px 5px rgba(0, 0, 0, 0.25)"
              bgColor="rgba(57, 62, 70, 0.5)"
              borderRadius="5px"
              p="15px"
            >
              <Flex m="25px 0px" direction="column" alignItems="center">
                <AvatarPicture
                  user={user}
                  usesUsername={usesUsername}
                  ref={imageRef}
                />
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  ref={inputRef}
                  onChange={(e) => {
                    loadFile(e);
                  }}
                  style={{ display: "none" }}
                />
                <HStack
                  flexDirection={!usesUsername && !newAvatar ? "row" : "column"}
                >
                  <Button
                    leftIcon={<Icon as={HiUpload} />}
                    colorScheme="purple"
                    variant="solid"
                    m="10px 0px"
                    onClick={() => {
                      document.getElementById("avatar").click();
                    }}
                  >
                    Avatar
                  </Button>
                  {!usesUsername && !newAvatar ? (
                    <IconButton
                      variant="solid"
                      colorScheme="red"
                      onClick={onOpen}
                      icon={<Icon as={HiOutlineX} />}
                    />
                  ) : null}
                  {newAvatar && !usesUsername ? (
                    <Button
                      leftIcon={<Icon as={HiOutlineSave} />}
                      variant="solid"
                      colorScheme="green"
                      onClick={updateAvatar}
                      isLoading={sending}
                    >
                      Mettre à jour l'avatar
                    </Button>
                  ) : null}
                </HStack>
              </Flex>
            </Box>
          </Flex>
        </form>
      ) : (
        <Heading as="h2" fontSize="5xl">
          {notFound.message}
        </Heading>
      )}
    </TopContainer>
  );
}
