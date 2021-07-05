export type ButtonTypeType = {
	info: string;
	success: string;
	warning: string;
	danger: string;
};

export enum ButtonTypeEnum {
	Info = "info",
	Success = "success",
	Warning = "warning",
	Danger = "danger",
}

export type ButtonSizeType = {
	sm: string;
	md: string;
	lg: string;
};

export enum ButtonSizeEnum {
	Sm = "sm",
	Md = "md",
	Lg = "lg",
}

export interface ButtonProps {
	label: string;
	variant?: ButtonTypeEnum;
	size?: ButtonSizeEnum;
	fullWidth?: boolean;
	startIcon?: JSX.Element;
	endIcon?: JSX.Element;
	[x: string]: any;
}

export interface ButtonStylesProps {
	variant?: ButtonTypeEnum;
	size?: ButtonSizeEnum;
	fullWidth?: boolean;
}
