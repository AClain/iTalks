import PropTypes from "prop-types";

import { useState } from "react";

import { Box, HStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import {
	FormControl,
	FormLabel,
	InputGroup,
	InputLeftAddon,
	Input,
	Select,
	Icon,
	FormHelperText,
	InputLeftElement,
} from "@chakra-ui/react";
import { UnorderedList, ListItem } from "@chakra-ui/react";

import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const UserCreateForm = ({ errors, register, watch }) => {
	const [show, setShow] = useState(false);

	return (
		<>
			<HStack m='25px 0px' alignItems='flex-start'>
				<FormControl id='email'>
					<FormLabel>
						Adresse email{" "}
						<sup>
							<b>*</b>
						</sup>
					</FormLabel>
					<Input
						type='email'
						name='email'
						ref={register({
							required: true,
							pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
						})}
					/>
					<FormHelperText>
						{errors.email && errors.email.type === "required" && <Text color='red.500'>Requis</Text>}
						{errors.email && errors.email.type === "pattern" && (
							<Text color='red.500'>Veuillez indiquer une adresse email correcte</Text>
						)}
					</FormHelperText>
				</FormControl>

				<FormControl id='username'>
					<FormLabel>
						Nom d&#39;utilisateur{" "}
						<sup>
							<b>*</b>
						</sup>
					</FormLabel>
					<InputGroup>
						<InputLeftAddon color='main.dark' borderColor='var(--text)'>
							@
						</InputLeftAddon>
						<Input
							type='text'
							name='username'
							ref={register({
								required: true,
								minLength: 3,
								maxLength: 25,
							})}
						/>
					</InputGroup>
					<FormHelperText>
						{errors.username && errors.username.type === "required" && <Text color='red.500'>Requis</Text>}
						{errors.username && (errors.username.type === "minLength" || errors.username.type === "maxLength") && (
							<Text color='red.500'>Le nom d&#39;utilisateur doit faire entre 3 et 25 caractères</Text>
						)}
					</FormHelperText>
				</FormControl>
			</HStack>
			<HStack w='50%' m='25px 0px' alignItems='flex-start'>
				<FormControl id='password'>
					<FormLabel>
						Mot de passe{" "}
						<sup>
							<b>*</b>
						</sup>
					</FormLabel>
					<InputGroup size='md'>
						<InputLeftElement
							onClick={() => {
								setShow(!show);
							}}
							cursor='pointer'>
							{show ? <Icon as={HiOutlineEyeOff} /> : <Icon as={HiOutlineEye} />}
						</InputLeftElement>
						<Input
							type={show ? "text" : "password"}
							name='password'
							ref={register({
								required: true,
								pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/g,
							})}
						/>
					</InputGroup>
					<FormHelperText>
						{errors.password && errors.password.type === "required" && <Text color='red.500'>Requis</Text>}
						{errors.password && errors.password.type === "pattern" && (
							<Box color='red.500'>
								<Text>Le mot de passe:</Text>
								<UnorderedList>
									{!watch("password").match(/^[A-Za-z\d@$!%*?&]{8,30}$/g) && (
										<ListItem>doit contenir entre 8 et 30 caractères</ListItem>
									)}
									{!watch("password").match(/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/g) && (
										<ListItem>au moins un caractère spécial</ListItem>
									)}
									{!watch("password").match(/^(?=.*\d)[A-Za-z\d@$!%*?&]{1,}$/g) && (
										<ListItem>au moins un chiffre</ListItem>
									)}
									{!watch("password").match(/^(?=.*[A-Z])[A-Za-z\d@$!%*?&]{1,}$/g) && (
										<ListItem>au moins une lettre majuscule</ListItem>
									)}
									{!watch("password").match(/^(?=.*[a-z])[A-Za-z\d@$!%*?&]{1,}$/g) && (
										<ListItem>au moins une lettre minuscule</ListItem>
									)}
								</UnorderedList>
							</Box>
						)}
					</FormHelperText>
				</FormControl>
			</HStack>
			<HStack m='25px 0px' alignItems='flex-start'>
				<FormControl id='role'>
					<FormLabel>
						Role{" "}
						<sup>
							<b>*</b>
						</sup>
					</FormLabel>
					<Select
						size='sm'
						color='#222831'
						borderColor='var(--text)'
						bgColor='var(--text)'
						name='role'
						ref={register({ required: true })}
						defaultValue='basic'>
						<option value='admin'>Admin</option>
						<option value='modérateur'>Modérateur</option>
						<option value='entreprise'>Entreprise</option>
						<option value='utilisateur'>Utilisateur</option>
					</Select>
					<FormHelperText>
						{errors.role && errors.status.role === "required" && <Text color='red.500'>Requis</Text>}
					</FormHelperText>
				</FormControl>
				<FormControl id='status'>
					<FormLabel>
						Statut{" "}
						<sup>
							<b>*</b>
						</sup>
					</FormLabel>
					<Select
						size='sm'
						color='#222831'
						borderColor='var(--text)'
						bgColor='var(--text)'
						name='status'
						ref={register({ required: true })}
						defaultValue='active'>
						<option value='actif'>Actif</option>
						<option value='retiré'>Retiré</option>
						<option value='supprimé'>Supprimé</option>
					</Select>
					<FormHelperText>
						{errors.status && errors.status.type === "required" && <Text color='red.500'>Requis</Text>}
					</FormHelperText>
				</FormControl>
			</HStack>
		</>
	);
};

UserCreateForm.propTypes = {
	errors: PropTypes.object.isRequired,
	register: PropTypes.func.isRequired,
	watch: PropTypes.func.isRequired,
};

export default UserCreateForm;
