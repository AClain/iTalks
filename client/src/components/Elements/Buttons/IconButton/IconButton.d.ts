import { ReactElement } from "react";

export enum IconButtonTypeEnum {
	Purple = "purple",
	Info = "info",
	Success = "success",
	Warning = "warning",
	Danger = "danger",
}

export type IconButtonSizeType = {
	sm: string;
	md: string;
	lg: string;
};

export enum IconButtonSizeEnum {
	Sm = "sm",
	Md = "md",
	Lg = "lg",
}

export interface IconButtonProps {
	type?: IconButtonTypeEnum;
	size?: IconButtonSizeEnum;
	light?: boolean;
	icon: ReactElement;
}

export interface IconButtonStylesProps {
	type?: IconButtonTypeEnum;
	size?: IconButtonSizeEnum;
	light?: boolean;
}
