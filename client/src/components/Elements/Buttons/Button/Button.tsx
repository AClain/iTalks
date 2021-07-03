import { FC } from "react";

import { Button as MaterialButton } from "@material-ui/core";

import { ButtonProps } from "./Button.d";
import { useStyles } from "./Button.styles";

const Button: FC<ButtonProps> = ({ type, size, fullWidth, ...rest }) => {
	const styles = useStyles({ type, size, fullWidth });

	return (
		<MaterialButton className={styles.default} {...rest}>
			Button
		</MaterialButton>
	);
};

export { Button };
