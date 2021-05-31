import PropTypes from "prop-types";

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

const CustomModal = ({
	isOpen,
	onClose,
	headerText,
	bodyText,
	closeText,
	sending,
	confirmColor,
	onConfirmClick,
	confirmText,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{headerText}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{bodyText}</ModalBody>

				<ModalFooter>
					<Button
						borderColor='main.purple'
						color='main.purple'
						_hover={{
							bgColor: "rgba(105, 48, 195, 0.2)",
						}}
						variant='ghost'
						onClick={onClose}>
						{closeText}
					</Button>
					<Button isLoading={sending} variant='ghost' colorScheme={confirmColor} onClick={onConfirmClick}>
						{confirmText}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

CustomModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func,
	headerText: PropTypes.string,
	bodyText: PropTypes.string,
	closeText: PropTypes.string,
	sending: PropTypes.bool,
	confirmColor: PropTypes.string,
	onConfirmClick: PropTypes.func,
	confirmText: PropTypes.string,
};

CustomModal.defaultProps = {
	isOpen: false,
	headerText: "Header",
	bodyText: "Body",
	closeText: "Fermer",
	sending: false,
	confirmColor: "green",
	confirmText: "Confirmer",
};

export default CustomModal;
