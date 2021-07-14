import { FC } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./ResetLink.styles";

declare interface ResetLinkProp {
	to: string;
	children: JSX.Element[] | JSX.Element | string;
	className?: string;
	color?: string;
	[x: string]: any;
}

const ResetLink: FC<ResetLinkProp> = ({ to, children, className, color, ...rest }) => {
	const styles = useStyles({ color });

	return (
		<Link className={`${styles.link} ${className}`} to={to} {...rest}>
			{children}
		</Link>
	);
};

export default ResetLink;
