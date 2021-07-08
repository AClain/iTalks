import { FormControlLabel, IconButton, Checkbox } from "@material-ui/core";
import { api } from "api/api.request";
import { Button } from "components/Elements/Buttons/Button/Button";
import FormControl from "components/Elements/Form/FormControl/FormControl";
import Flex, { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { HiAtSymbol, HiEye, HiEyeOff } from "react-icons/hi";
import { useStyles } from "./LoginForm.styles";
import { AxiosError } from "axios";

interface LoginError {
	identifier?: string;
	password?: string;
	type?: string;
}

const LoginForm: FC<{}> = () => {
	const styles = useStyles();
	// Hook form
	const { register, handleSubmit } = useForm();
	// States
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<LoginError>({});
	const [type, setType] = useState("username");
	const [loading, setLoading] = useState(false);
	// Custom methods
	const onSubmit = (data: any) => {
		console.log(data);
		setLoading(true);
		api.user
			.login(data)
			.then((res) => {
				console.log(res);
			})
			.catch((err: AxiosError) => {
				if (err.response?.data.errors) {
					setErrors(err.response?.data.errors);
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const handleSwitch = () => {
		if (type === "username") {
			setType("email");
			return;
		}
		setType("username");
	};
	const changePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	// Custom components
	const PasswordIcon: FC<{}> = () => {
		return (
			<IconButton className={styles.icon} onClick={changePasswordVisibility}>
				{showPassword ? <HiEyeOff /> : <HiEye />}
			</IconButton>
		);
	};

	return (
		<Flex direction={FlexDirectionEnum.Horizontal} height='100%'>
			<Flex className={styles.leftContainer} direction={FlexDirectionEnum.Vertical} centered>
				<img width='70%' src='/assets/images/login_authentication.svg' alt='authentification' />
			</Flex>
			<Flex className={styles.rightContainer} direction={FlexDirectionEnum.Vertical} centered>
				<Title className={styles.title} semantic={TitleVariantEnum.H3}>
					Connexion
				</Title>
				<form className={styles.form} noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
					{type === "username" ? (
						<FormControl
							error={typeof errors.identifier !== "undefined"}
							label="Nom d'utilisateur"
							type='text'
							identifier='identifier'
							register={register}
							startIcon={<FaUserCircle />}
						></FormControl>
					) : (
						<FormControl
							error={typeof errors.identifier !== "undefined"}
							label='Adresse mail'
							type='text'
							identifier='identifier'
							register={register}
							startIcon={<HiAtSymbol />}
						></FormControl>
					)}
					<span className={styles.error}>{errors.identifier}</span>
					<input type='hidden' {...register("type")} name='type' value={type === "username" ? "username" : "email"} />
					<FormControlLabel
						className={styles.checkboxContainer}
						control={<Checkbox className={styles.checkbox} checked={type === "email"} onChange={handleSwitch} />}
						label='Utiliser mon adresse mail'
					/>
					<FormControl
						error={typeof errors.password !== "undefined"}
						label='Mot de passe'
						type={showPassword ? "text" : "password"}
						identifier='password'
						register={register}
						endIcon={<PasswordIcon />}
					></FormControl>
					<span className={styles.error}>{errors.password}</span>
					<Button className={styles.submit} disabled={loading} label="S'identifier" type='submit' />
				</form>
			</Flex>
		</Flex>
	);
};

export default LoginForm;
