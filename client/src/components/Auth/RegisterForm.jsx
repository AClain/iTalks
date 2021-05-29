import { FormControl, FormLabel, InputGroup, InputLeftAddon, Input } from "@chakra-ui/react";
import { Box, Flex, HStack } from "@chakra-ui/react";

const RegisterForm = () => {
	return (
		<HStack h='100%'>
			<Box h='100%' w='50%' bg='var(--text)' />
			<Flex w='50%' h='100%' alignItems='center' bg='transparent' p='0px 15px' m='none'>
				<FormControl id='username' isRequired>
					<FormLabel>Nom d&#39;utilisateur</FormLabel>
					<InputGroup>
						<InputLeftAddon color='var(--bg)' bg='var(--text)' borderColor='var(--text)'>
							@
						</InputLeftAddon>
						<Input type='text' placeholder="Nom d'utilisateur" />
					</InputGroup>
				</FormControl>
			</Flex>
		</HStack>
	);
};

export default RegisterForm;
