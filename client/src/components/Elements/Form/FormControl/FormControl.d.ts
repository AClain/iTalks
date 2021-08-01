export interface FormControlProps {
	label: string;
	identifier: string;
	type: string;
	defaultValue?: any;
	register?: any;
	startIcon?: JSX.Element;
	endIcon?: JSX.Element;
	[x: string]: any;
}
