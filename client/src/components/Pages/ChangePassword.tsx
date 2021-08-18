// React
import { FC, useState } from "react";
// Librairies
import { BottomNavigation, BottomNavigationAction, Box } from "@material-ui/core";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { api } from "api/api.request";
import { useStyles } from "./RegisterForm.styles";
// Librairies
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

type NewPassword = {
	id: string;
};

const Password: FC<{}> = () => {
	const styles = useStyles();
	// Hook form
	const { handleSubmit } = useForm();
	// States
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<NewPassword>();
	const [loading, setLoading] = useState(false);
	// Custom methods
	const onSubmit = (data: any): any => {
        console.log(data);
		setLoading(true);
		api.user
			.register(data)
			.then((res) => {
				if (res.status === 201) {
					document.location.href = "/settings";
				}
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
	return (
             <FormControl
						error={typeof errors.password !== "undefined"}
						label='Mot de passe'
						type={showPassword ? "text" : "password"}
						identifier='password'
						register={register}
						endIcon={<PasswordIcon />}
					></FormControl>
					<span className={styles.error}>{errors.password ? errors.password[0] : ""}</span>
					<FormControl
						error={typeof errors.password_confirmation !== "undefined"}
						label='Confirmation du mot de passe'
						type={showPassword ? "text" : "password"}
						identifier='password_confirmation'
						register={register}
					></FormControl>
					<span className={styles.error}>{errors.password_confirmation ? errors.password_confirmation[0] : ""}</span>
		<BottomNavigation value={value} onChange={handleChange} className={classes.root}>
			<BottomNavigationAction label="mdp" value="mdp" icon/>
			<BottomNavigationAction label="avatar" value="avatar" icon/>
			<BottomNavigationAction label="infos" value="infos"/>
		</BottomNavigation>

        
	);
};

export default Password;
