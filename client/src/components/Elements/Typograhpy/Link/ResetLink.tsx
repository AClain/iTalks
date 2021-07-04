import { FC } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./ResetLink.styles";

declare interface ResetLinkProp {
	to: string;
	children: JSX.Element[] | JSX.Element;
}

const ResetLink: FC<ResetLinkProp> = ({ to, children }) => {
	const styles = useStyles();

	return (
		<Link className={styles.link} to={to}>
			{children}
		</Link>
	);
};

export default ResetLink;
