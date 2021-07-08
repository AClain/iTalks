import { FC } from "react";
import { FormControlProps } from "./FormControl.d";
import { useStyles } from "./FormControl.styles";
import { FormControl as MFormControl, InputLabel, InputAdornment, FilledInput } from "@material-ui/core";

const FormControl: FC<FormControlProps> = ({
	label,
	identifier,
	type,
	defaultValue,
	register,
	startIcon,
	endIcon,
	...rest
}) => {
	const styles = useStyles();

	let dynamicProp: any = [];
	if (defaultValue) {
		dynamicProp.push({ defaultValue: defaultValue });
	}

	return (
		<MFormControl variant='filled' className={styles.formControl}>
			<InputLabel htmlFor={identifier} className={styles.label}>
				{label}
			</InputLabel>
			<FilledInput
				id={identifier}
				name={identifier}
				type={type}
				className={styles.input}
				{...dynamicProp}
				{...register(identifier)}
				startAdornment={startIcon ? <InputAdornment position='start'>{startIcon}</InputAdornment> : undefined}
				endAdornment={endIcon ? <InputAdornment position='end'>{endIcon}</InputAdornment> : undefined}
				{...rest}
			/>
		</MFormControl>
	);
};

export default FormControl;
