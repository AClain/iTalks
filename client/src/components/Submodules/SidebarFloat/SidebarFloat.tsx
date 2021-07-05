// React
import { FC, useState, useContext } from "react";

// Providers
import { ThemeContext } from "providers/ThemeContext";

// Material ui
import { Box } from "@material-ui/core";

// Styles
import { useStyles } from "./SidebarFloat.styles";

// Icons
import { HiCog, HiOutlineX, HiOutlineSun, HiMoon, HiStatusOnline } from "react-icons/hi";
import { AiOutlinePoweroff } from "react-icons/ai";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";

interface SidebarFloatProps {
	exclude: boolean;
}

const SidebarFloat: FC<SidebarFloatProps> = ({ exclude }) => {
	const styles = useStyles();

	const context = useContext(ThemeContext);

	const [hidden, setHidden] = useState(true);

	const changeMode = () => {
		if (context.setTheme) {
			if (context.theme === "dark") {
				context.setTheme("light");
				localStorage.setItem("theme", "light");
				return;
			}
			context.setTheme("dark");
			localStorage.setItem("theme", "dark");
		}
	};

	if (exclude) {
		return <></>;
	}

	return (
		<Box display='flex' flexDirection='column' alignItems='center' position='absolute' bottom='25px' right='25px'>
			{hidden ? (
				<HiCog
					className={`${styles.default} ${styles.open}`}
					onClick={() => {
						setHidden(!hidden);
					}}
				/>
			) : (
				<>
					<ResetLink to='/notifications'>
						<HiStatusOnline className={`${styles.subIcon} ${styles.notifications}`} />
					</ResetLink>
					{context.theme === "dark" ? (
						<HiOutlineSun className={`${styles.subIcon} ${styles.lightTheme}`} onClick={changeMode} />
					) : (
						<HiMoon className={`${styles.subIcon} ${styles.darkTheme}`} onClick={changeMode} />
					)}
					<ResetLink to='/logout'>
						<AiOutlinePoweroff className={`${styles.subIcon} ${styles.logoutIcon}`} />
					</ResetLink>
					<HiOutlineX
						className={styles.default}
						onClick={() => {
							setHidden(!hidden);
						}}
					/>
				</>
			)}
		</Box>
	);
};

export default SidebarFloat;
