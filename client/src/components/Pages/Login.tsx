import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from "@material-ui/core";
import { UserCreate } from "api/types/user";
import { Button } from "components/Elements/Buttons/Button/Button";
import Flex, { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { BaseSyntheticEvent, FC, useState } from "react";
import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useStyles } from "./Login.styles";

const Login: FC<{}> = () => {
	const styles = useStyles();

	const { register, handleSubmit } = useForm();

	const [showPassword, setShowPassword] = useState(false);
	const [user, setUser] = useState<UserCreate>({
		username: "",
		email: "",
		password: "",
		password_confirmation: "",
	});

	const onSubmit = (data: any) => {
		console.log(data);
	};

	const changePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Flex fullWidth centered direction={FlexDirectionEnum.Vertical}>
			<Title semantic={TitleVariantEnum.H2}>Inscription</Title>
			<form className={styles.form} noValidate onSubmit={handleSubmit(onSubmit)}>
				<Flex centered direction={FlexDirectionEnum.Vertical}>
					<FormControl>
						<InputLabel htmlFor='password' className={styles.label}>
							Password
						</InputLabel>
						<Input
							id='password'
							type={showPassword ? "text" : "password"}
							className={styles.input}
							{...register("password")}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton className={styles.icon} onClick={changePasswordVisibility}>
										{showPassword ? <HiEyeOff /> : <HiEye />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>

					{/* <TextField
                        {...register}
                        InputLabelProps={{ className: styles.label }}
                        InputProps={{ className: styles.input }}
                        id='password'
                        label='Password'
                        type='password'
                    /> */}
					<Button label="S'inscrire" type='submit' />
				</Flex>
			</form>
		</Flex>
	);
};

export default Login;
