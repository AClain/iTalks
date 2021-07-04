import { FC } from "react";

import { Button as MaterialButton } from "@material-ui/core";

import { ButtonProps } from "./Button.d";
import { useStyles } from "./Button.styles";

const Button: FC<ButtonProps> = ({ label, type, size, fullWidth, startIcon, endIcon, ...rest }) => {
	const styles = useStyles({ type, size, fullWidth });

	return (
		<MaterialButton className={styles.default} startIcon={startIcon} endIcon={endIcon} {...rest}>
			{label}
		</MaterialButton>
	);
};

export { Button };
