// React libraries
import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

// Contexts
import { GlobalContext } from "../../providers/GlobalContext";

// Component librairy
import { Icon, Alert, AlertIcon } from "@chakra-ui/react";
import { FormControl, FormLabel, FormHelperText, InputGroup, InputRightElement, Input } from "@chakra-ui/react";
import { Image, Text } from "@chakra-ui/react";
import { Stack, HStack, Flex } from "@chakra-ui/react";

// Custom element
import CustomButton from "../Misc/Buttons/CustomButton";

// Icons & images
import { HiEye, HiEyeOff } from "react-icons/hi";

// Custom modules
import auth from "../../api/Auth";

const RegisterForm = () => {
	// Context
	const { alert, setAlert } = useContext(GlobalContext);

	// React router dom
	const history = useHistory();

	// Refs
	const formRef = useRef();

	// States
	const [usingEmail] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);

	// Form
	const { register, handleSubmit, errors } = useForm();

	// Custom functions
	const onServerUnavailable = (message) => {
		setAlert({
			...alert,
			message: message,
			status: "error",
			shouldDisplay: true,
		});
	};

	const onServer201 = (message) => {
		setAlert({
			...alert,
			message: message,
			status: "success",
			shouldDisplay: true,
		});
	};

	const onSubmit = (userData) => {
		console.log(userData);
		setLoading(true);
		auth
			.register(userData)
			.then((res) => {
				console.log("res", res);
				if (res.status === 201) {
					onServer201(res.data.message);
					setTimeout(() => {
						setLoading(false);
						history.push("/");
					}, 1000);
					return true;
				}
				onServerUnavailable("500: Impossible de se connecter au serveur. Veuillez réessayer plus tard.");
				return false;
			})
			.catch((err) => {
				setTimeout(() => {
					console.log("err", err.response);
					setTimeout(() => {
						setLoading(false);
					});
					if (err.response.status === 400) {
						setServerErrors(err.response.data.errors);
						return false;
					}
					onServerUnavailable("500: Impossible de se connecter au serveur. Veuillez réessayer plus tard.");
					return false;
				});
			});
	};

	return (
		<HStack h='100%'>
			<Flex h='100%' w='50%' justifyContent='center' alignItems='center' bg='var(--text)'>
				<Image w='150px' h='150px' src='/assets/images/italks-logo-transparent.png' />
			</Flex>
			<form style={{ width: "50%" }} onSubmit={handleSubmit(onSubmit)} ref={formRef}>
				<Stack w='100%' alignItems='center' justifyContent='center' bg='transparent' p='0px 15px' m='none'>
					{Object.values(serverErrors).length > 0 &&
						Object.values(serverErrors).map((message, i) => (
							<Alert key={i} status='error' m='10px 0px' color='main.dark'>
								<AlertIcon />
								<Text color='red.500'>{message}</Text>
							</Alert>
						))}

					<input type='hidden' name='type' ref={register} value={usingEmail ? "email" : "username"} />
					<FormControl isRequired mb='25px' minW='350px' maxW='600px'>
						<FormLabel>Email</FormLabel>
						<InputGroup>
							<Input
								type='text'
								name='identifier'
								placeholder="Email"
								ref={register({
									required: true,
									pattern: usingEmail ? /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ : /(.)*/,
								})}
								isInvalid={serverErrors["identifier"] !== undefined}
							/>
						</InputGroup>
						{errors.email && errors.email.type === "required" && (
							<FormHelperText>
								<Text color='var(--danger)'>Requis</Text>
							</FormHelperText>
						)}
						{errors.email && errors.email.type === "pattern" && (
							<FormHelperText>
								<Text color='var(--danger)'>Le format ne correspond pas</Text>
							</FormHelperText>
						)}
					</FormControl>
					<FormControl isRequired mb='25px' minW='350px' maxW='600px'>
						<FormLabel>Pseudo</FormLabel>
						<InputGroup>
							<Input
								type="text"
								name='username'
								placeholder='Pseudo'
								ref={register({ required: true, min: 3, max: 25})}
								isInvalid={serverErrors["username"] !== undefined}
							/>
						</InputGroup>
						{errors.username && errors.username.type === "required" && (
							<FormHelperText>
								<Text color='var(--danger)'>Requis</Text>
							</FormHelperText>
						)}
					</FormControl>
					<FormControl isRequired mb='25px' minW='350px' maxW='600px'>
						<FormLabel>Mot de passe</FormLabel>
						<InputGroup>
							<Input
								type={showPassword ? "text" : "password"}
								name='password'
								placeholder='Mot de passe'
								ref={register({ required: true })}
								isInvalid={serverErrors["password"] !== undefined}
							/>
							<InputRightElement>
								<Icon
									as={showPassword ? HiEye : HiEyeOff}
									color='var(--text)'
									onClick={() => {
										setShowPassword(!showPassword);
									}}
									_hover={{ cursor: "pointer" }}
								/>
							</InputRightElement>
						</InputGroup>
						{errors.password && errors.password.type === "required" && (
							<FormHelperText>
								<Text color='var(--danger)'>Requis</Text>
							</FormHelperText>
						)}
					</FormControl>
					<FormControl isRequired mb='25px' minW='350px' maxW='600px'>
						<FormLabel>Confirmation de votre mot de passe</FormLabel>
						<InputGroup>
							<Input
								type={showPassword ? "text" : "password"}
								name='password'
								placeholder='Confirmation de votre mot de passe'
								ref={register({ required: true })}
								isInvalid={serverErrors["password"] !== undefined}
							/>
							<InputRightElement>
								<Icon
									as={showPassword ? HiEye : HiEyeOff}
									color='var(--text)'
									onClick={() => {
										setShowPassword(!showPassword);
									}}
									_hover={{ cursor: "pointer" }}
								/>
							</InputRightElement>
						</InputGroup>
						{errors.password && errors.password.type === "required" && (
							<FormHelperText>
								<Text color='var(--danger)'>Requis</Text>
							</FormHelperText>
						)}
					</FormControl>
					<CustomButton type='submit' customType='global' customSize='md' isLoading={loading}>
						Inscription
					</CustomButton>
				</Stack>
			</form>
		</HStack>
	);
};

export default RegisterForm;
