import { IconButton } from "@material-ui/core";
import { UserCreate } from "api/types/user";
import { Button } from "components/Elements/Buttons/Button/Button";
import FormControl from "components/Elements/Form/FormControl/FormControl";
import Flex, { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { HiAtSymbol, HiEye, HiEyeOff } from "react-icons/hi";
import { useStyles } from "./RegisterForm.styles";

const RegisterForm: FC<{}> = () => {
	const styles = useStyles();

	// Hook form
	const { register, handleSubmit } = useForm();

	// States
	const [showPassword, setShowPassword] = useState(false);
	const [user, setUser] = useState<UserCreate>({
		username: "",
		email: "",
		password: "",
		password_confirmation: "",
	});

	// Custom methods
	const onSubmit = (data: any) => {
		console.log(data);
	};
	const changePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const PasswordIcon: FC<{}> = () => {
		return (
			<IconButton className={styles.icon} onClick={changePasswordVisibility}>
				{showPassword ? <HiEyeOff /> : <HiEye />}
			</IconButton>
		);
	};

	return (
		<Flex direction={FlexDirectionEnum.Vertical}>
			<Title semantic={TitleVariantEnum.H1}>Inscription</Title>
			<form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
				<Flex centered direction={FlexDirectionEnum.Vertical}>
					<FormControl
						label="Nom d'utilisateur"
						type='text'
						identifier='username'
						register={register}
						startIcon={<FaUserCircle />}
					></FormControl>
					<FormControl
						label='Adresse mail'
						type='text'
						identifier='email'
						register={register}
						startIcon={<HiAtSymbol />}
					></FormControl>
					<FormControl
						label='Mot de passe'
						type={showPassword ? "text" : "password"}
						identifier='password'
						register={register}
						endIcon={<PasswordIcon />}
					></FormControl>
					<FormControl
						label='Confirmation du mot de passe'
						type={showPassword ? "text" : "password"}
						identifier='password_confirmation'
						register={register}
					></FormControl>
					<Button label="S'inscrire" type='submit' />
				</Flex>
			</form>
		</Flex>
	);
};

export default RegisterForm;
