import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import CustomButton from "../Misc/Buttons/CustomButton";
import { Input } from "@chakra-ui/react";



import TopContainer from "../Misc/TopContainer";

const Settings = () => {
	return (
		
		<TopContainer alignItems='center'>
			<Heading as='h1'>Paramètres</Heading>

			<br></br>
			
			<Text> Modifier mes informations personnelles </Text>
			<br></br>
			<Text> Modifier ma photo de profil</Text>
			
 
			<br></br>
			
			
			<Input w='15%'
			name='nom'
			placeholder='Nom d&#39;utilisateur'
			/>
			<br />
			<Input w='15%'
			name='email'
			placeholder='Email'
			/>
			<br />
			<Input w='15%'
			name='password'
			placeholder='Mot de passe'
			/>
			<br />
			
<br></br>
<CustomButton type='submit' customType='global' customSize='md' >
Sauvegarder
</CustomButton>

		</TopContainer>
	);
};

export default Settings;
