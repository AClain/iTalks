import Flex, { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex";
import LoginForm from "components/Modules/LoginForm";
import RegisterForm from "components/Modules/RegisterForm";
import { FC } from "react";
import { useStyles } from "./AuthForms.styles";

const AuthForms: FC<{ mode: string }> = ({ mode }) => {
	const styles = useStyles();

	return (
		<Flex className={styles.container} fullWidth centered direction={FlexDirectionEnum.Vertical}>
			<Flex className={styles.card} direction={FlexDirectionEnum.Horizontal}>
				{mode === "login" ? <LoginForm /> : <RegisterForm />}
			</Flex>
		</Flex>
	);
};

export default AuthForms;
