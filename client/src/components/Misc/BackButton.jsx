import { useHistory } from "react-router";

import { IconButton, Icon } from "@chakra-ui/react";

import { HiArrowNarrowLeft } from "react-icons/hi";

export default function BackButton(props) {
  let history = useHistory();

  return (
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
  );
}
