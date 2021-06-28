import { Flex } from "@chakra-ui/react";
import { Image, Text, Divider } from "@chakra-ui/react";

const AuthPagePresentation = () => {
	return (
		<Flex h='100%' w='60%' direction='column' justify='space-evenly' bg='var(--text)' color='var(--bg)'>
			<Flex align='center' justify='start' fontSize='100px' pos='relative'>
				<Image h='250px' src='/assets/images/browse.svg' />
				<Text fontFamily='Roboto Black' pos='absolute' bottom='0' left='30%'>
					Parcourez
				</Text>
			</Flex>
			<Divider borderStyle='dashed' />
			<Flex align='center' justify='end' fontSize='100px' pos='relative'>
				<Text fontFamily='Roboto Black' pos='absolute' bottom='0' right='30%'>
					Réagissez
				</Text>
				<Image h='250px' src='/assets/images/feedback.svg' />
			</Flex>
			<Divider borderStyle='dashed' />
			<Flex align='center' justify='start' fontSize='100px' pos='relative'>
				<Image h='250px' src='/assets/images/messages.svg' />
				<Text fontFamily='Roboto Black' pos='absolute' bottom='0' left='30%'>
					Échangez
				</Text>
			</Flex>
		</Flex>
	);
};

export default AuthPagePresentation;
