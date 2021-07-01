import { Flex } from "@chakra-ui/react";
import { Image, Text, Divider } from "@chakra-ui/react";

const AuthPagePresentation = () => {
	return (
		<Flex h='100%' w='50%' direction='column' justify='space-evenly' bg='var(--text)' color='var(--bg)'>
			<Flex align='center' justify='start' fontSize='30px' pos='relative'>
				<Image h='250px' src='/assets/images/browse.svg' />
				<Text fontFamily='Roboto Black' pos='absolute' bottom='15%' left='35%'>
				Créer, partager, commenter 
				<br></br> Nous sommes là ! 
				</Text>
			</Flex>
			<Divider borderStyle='dashed' />
			<Flex align='center' justify='end' fontSize='30px' pos='relative'>
				<Text fontFamily='Roboto Black' pos='absolute' bottom='15%' left='35%'>
				Un doute sur votre prochain achat ? 
				<br></br>Nous sommes là pour vous aider !
				</Text>
				<Image h='250px' src='/assets/images/feedback.svg' />
			</Flex>
			<Divider borderStyle='dashed' />
			<Flex align='center' justify='start' fontSize='30px' pos='relative'>
				<Image h='250px' src='/assets/images/messages.svg' />
				<Text fontFamily='Roboto Black' pos='absolute' bottom='15%' left='35%'>
				Donner votre avis sur différents produits, <br></br> différentes marques.
				</Text>
			</Flex>
		</Flex>
	);
};

export default AuthPagePresentation;
