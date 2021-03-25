import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export default function CustomModal(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.headerText}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{props.bodyText}</ModalBody>

        <ModalFooter>
          <Button
            borderColor="main.purple"
            color="main.purple"
            _hover={{
              bgColor: "rgba(105, 48, 195, 0.2)",
            }}
            variant="ghost"
            onClick={props.onClose}
          >
            {props.closeText}
          </Button>
          <Button
            isLoading={props.sending}
            variant="ghost"
            colorScheme={props.confirmColor}
            onClick={props.onConfirmClick}
          >
            {props.confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
