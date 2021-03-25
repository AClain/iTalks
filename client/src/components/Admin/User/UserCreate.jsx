import { useState, useRef, useContext } from "react";
import { GlobalAlertContext } from "../../Global/GlobalAlertContext";

import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";

import { Helmet } from "react-helmet-async";
import AdminRequest from "../../../api/AdminRequests";

import { Box, Flex, HStack } from "@chakra-ui/layout";
import { Heading, Text } from "@chakra-ui/layout";
import { IconButton, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { Icon, Spacer } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

import TopContainer from "../../Misc/TopContainer";

import { HiOutlineX, HiUpload, HiArrowNarrowLeft } from "react-icons/hi";
import UserCreateForm from "./forms/UserCreateForm";

export default function UserCreate() {
  // Context
  const { alert, setAlert } = useContext(GlobalAlertContext);

  // History
  const history = useHistory();

  // Refs
  const inputRef = useRef();
  const formRef = useRef();

  // States
  const [usesUsername, setUsesUsername] = useState(true);
  const [serverErrors, setServerErrors] = useState([]);
  const [sending, setSending] = useState(false);

  // Form
  const { register, handleSubmit, watch, errors } = useForm();

  // Functions
  const removeImage = () => {
    if (
      (document.getElementById("avatar") &&
        document.getElementById("avatar").value !== "") ||
      (inputRef.current && inputRef.current.getAttribute("src") !== "#")
    ) {
      document.getElementById("avatar").value = "";
      inputRef.current.setAttribute("src", "#");
      setUsesUsername(true);
    }
  };

  const loadFile = (e) => {
    setUsesUsername(false);

    var reader = new FileReader();
    reader.onload = function (e) {
      inputRef.current.setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit = (userData) => {
    setSending(true);
    AdminRequest.create(userData)
      .then((data) => {
        setSending(false);
        if (data.status === 201) {
          setAlert({
            ...alert,
            message: data.data.message,
            status: "success",
            shouldDisplay: true,
          });
          removeImage();
          formRef.current.reset();
          setServerErrors([]);
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
        console.log(err);
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

  return (
    <TopContainer alignItems="center">
      <Helmet>
        <title>iTalks - Administration - Ajouter un utilisateur</title>
      </Helmet>

      <HStack m="35px 0px" w="90%">
        <IconButton
          borderColor="main.purple"
          _hover={{
            bgColor: "rgba(105, 48, 195, 0.2)",
          }}
          variant="ghost"
          onClick={() => {
            history.goBack();
          }}
          icon={<Icon as={HiArrowNarrowLeft} fontSize={25} />}
        />

        <Heading textAlign="center" as="h2" w="max-content" p="0px 15px">
          Ajouter un utilisateur
        </Heading>
      </HStack>

      <form
        style={{ width: "90%" }}
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
      >
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
                  <Alert key={i} status="error" m="10px 0px" color="main.dark">
                    <AlertIcon />
                    <Text color="red.500">{message}</Text>
                  </Alert>
                ))
              : null}

            <UserCreateForm errors={errors} register={register} watch={watch} />

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
              Ajouter
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
              <Flex
                w="150px"
                h="150px"
                bgColor={usesUsername ? "main.purple" : "transparent"}
                borderRadius="50%"
                alignItems="center"
                justifyContent="center"
                fontSize={35}
                m="15px 0px"
                overflow="hidden"
              >
                {usesUsername ? (
                  watch("username") !== undefined ? (
                    watch("username").substring(0, 1).toUpperCase()
                  ) : (
                    ""
                  )
                ) : (
                  <Image
                    w="100%"
                    h="auto"
                    ref={inputRef}
                    src="#"
                    alt="avatar"
                  />
                )}
              </Flex>
              <input
                type="file"
                name="avatar"
                id="avatar"
                ref={register}
                onChange={(e) => {
                  loadFile(e);
                }}
                style={{ display: "none" }}
              />
              <HStack>
                <Button
                  leftIcon={<Icon as={HiUpload} />}
                  colorScheme="purple"
                  variant="solid"
                  onClick={() => {
                    document.getElementById("avatar").click();
                  }}
                >
                  Avatar
                </Button>
                {usesUsername ? null : (
                  <IconButton
                    variant="solid"
                    colorScheme="red"
                    onClick={removeImage}
                    icon={<Icon as={HiOutlineX} />}
                  />
                )}
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </form>
    </TopContainer>
  );
}
