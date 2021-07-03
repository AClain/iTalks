import { ReactElement } from "react";

declare enum IconButtonTypeEnum {
	Purple = "purple",
	Info = "info",
	Success = "success",
	Warning = "warning",
	Danger = "danger",
}

declare type IconButtonSizeType = {
	sm: string;
	md: string;
	lg: string;
};

declare enum IconButtonSizeEnum {
	Sm = "sm",
	Md = "md",
	Lg = "lg",
}

declare interface IconButtonProps {
	type?: IconButtonTypeEnum;
	size?: IconButtonSizeEnum;
	light?: boolean;
	icon: ReactElement;
}

declare interface IconButtonStylesProps {
	type?: IconButtonTypeEnum;
	size?: IconButtonSizeEnum;
	light?: boolean;
}

export { IconButtonTypeEnum, IconButtonSizeType, IconButtonProps, IconButtonStylesProps };
