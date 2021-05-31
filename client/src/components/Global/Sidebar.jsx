import { useLocation } from "react-router-dom";

import { Stack } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

import {
	HiSearch,
	HiOutlineHome,
	HiOutlineUserCircle,
	HiAdjustments,
	HiBookmark,
	HiChatAlt2,
	HiStatusOnline,
	HiOutlineShieldExclamation,
} from "react-icons/hi";

import LinkTo from "../Misc/LinkTo";
import IconWithBadge from "../Misc/IconWithBadge";
import SidebarIcon from "../Misc/SidebarIcon";
import Auth from "../../api/Auth";

const Sidebar = () => {
	let location = useLocation();
	const currentPath = location.pathname;

	return (
		<Stack
			p='10px 10px'
			position='absolute'
			left='0'
			top='0'
			w='125px'
			h='100vh'
			minH='500px'
			overflowY='auto'
			align='center'
			spacing={8}>
			<LinkTo style={{ textAlign: "center" }} to='/'>
				<Image display='initial' w='50%' src='/assets/images/italks-logo-transparent.png' alt='Logo' />
			</LinkTo>

			<Divider w='50%' borderColor='var(--text)' />

			<LinkTo to='/'>
				<SidebarIcon active={currentPath === "/"} icon={HiOutlineHome} />
			</LinkTo>
			<LinkTo to='/search'>
				<SidebarIcon active={currentPath.includes("search")} icon={HiSearch} />
			</LinkTo>
			<LinkTo to='/notifications'>
				<IconWithBadge
					active={currentPath.includes("notifications")}
					icon={HiStatusOnline}
					w={8}
					h={8}
					badgeNumber={0}
				/>
			</LinkTo>
			<LinkTo to='/saved'>
				<SidebarIcon active={currentPath.includes("saved")} icon={HiBookmark} />
			</LinkTo>

			<Divider w='50%' borderColor='var(--text)' />

			<LinkTo to='/profil'>
				<SidebarIcon active={currentPath.includes("profil")} icon={HiOutlineUserCircle} />
			</LinkTo>
			<LinkTo to='/messages'>
				<IconWithBadge active={currentPath.includes("messages")} icon={HiChatAlt2} w={8} h={8} badgeNumber={0} />
			</LinkTo>
			<LinkTo to='/settings'>
				<SidebarIcon active={currentPath.includes("settings")} icon={HiAdjustments} />
			</LinkTo>

			{Auth.isAdmin() && (
				<>
					<Divider w='50%' borderColor='var(--text)' />

					<LinkTo to='/admin/users'>
						<SidebarIcon active={currentPath.includes("admin")} icon={HiOutlineShieldExclamation} />
					</LinkTo>
				</>
			)}
		</Stack>
	);
};

export default Sidebar;
