declare type ButtonTypeType = {
	default: string;
	info: string;
	success: string;
	warning: string;
	danger: string;
};

declare enum ButtonTypeEnum {
	Default = "default",
	Info = "info",
	Success = "success",
	Warning = "warning",
	Danger = "danger",
}

declare type ButtonSizeType = {
	sm: string;
	md: string;
	lg: string;
};

declare enum ButtonSizeEnum {
	Sm = "sm",
	Md = "md",
	Lg = "lg",
}

declare interface ButtonProps {
	type?: ButtonTypeEnum;
	size?: ButtonSizeEnum;
	fullWidth?: boolean;
}

export { ButtonTypeType, ButtonSizeType, ButtonProps };
