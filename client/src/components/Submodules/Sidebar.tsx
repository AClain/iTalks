// React
import { FC } from "react";
// Librairies
import { useStyles } from "./Sidebar.styles";
import { useLocation } from "react-router-dom";
// Components
import { Box, Divider } from "@material-ui/core";
import {
	HiOutlineHome,
	HiSearch,
	HiBookmark,
	HiOutlineUserCircle,
	HiChatAlt2,
	HiAdjustments,
	HiOutlineShieldExclamation,
} from "react-icons/hi";
import Icon from "components/Elements/Buttons/Icon/Icon";
// Api interface
import auth from "api/auth";

const Sidebar: FC<{}> = () => {
	const styles = useStyles();

	let location = useLocation();
	const currentPath = location.pathname;

	return (
		<Box
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			width='100px'
			boxShadow='var(--medium-box-shadow)'
		>
			<Icon icon={<HiOutlineHome />} active={currentPath === "/"} />
			<Icon icon={<HiSearch />} active={currentPath.includes("search")} />
			<Icon icon={<HiBookmark />} active={currentPath.includes("saved")} />
			<Divider light style={{ width: "55%", border: "solid 1px", margin: "10px 0px" }} />
			<Icon icon={<HiOutlineUserCircle />} active={currentPath.includes("profil")} />
			<Icon icon={<HiChatAlt2 />} active={currentPath.includes("messages")} />
			<Icon icon={<HiAdjustments />} active={currentPath.includes("settings")} />
			<Divider light style={{ width: "55%", border: "solid 1px", margin: "10px 0px" }} />
			{auth.isAdmin() && (
				<>
					<Icon icon={<HiOutlineShieldExclamation />} />
				</>
			)}
		</Box>
	);
};

export default Sidebar;
