import { useContext, useEffect } from "react";
import { GlobalAlertContext } from "../Global/GlobalAlertContext";

import { Flex } from "@chakra-ui/layout";
import { Alert, AlertIcon, CloseButton } from "@chakra-ui/react";

import "./styles/global_alert.css";

export default function GlobalAlert(props) {
  const { alert, setAlert } = useContext(GlobalAlertContext);

  useEffect(() => {
    let event = setTimeout(() => {
      setAlert({ ...alert, shouldDisplay: false });
    }, 5000);
    return () => {
      clearTimeout(event);
    };
  }, [alert.shouldDisplay]);

  return alert.shouldDisplay ? (
    <Flex
      position="fixed"
      bottom="55px"
      pr="50px"
      justifyContent="flex-end"
      className={alert.shouldDisplay ? "alert-show" : "alert-hidden"}
      w="100%"
    >
      <Alert
        id="global-alert"
        status={alert.status}
        w="max-content"
        variant="left-accent"
      >
        <AlertIcon />
        {alert.message}
        <CloseButton
          ml="100"
          onClick={() => {
            setAlert({ ...alert, shouldDisplay: false });
          }}
        />
      </Alert>
    </Flex>
  ) : null;
}
