import PropTypes from "prop-types";

import moment from "moment";

import { Tr, Td } from "@chakra-ui/react";
import { Icon, Badge } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";

import { HiOutlineExternalLink, HiOutlineEye, HiOutlinePencilAlt, HiTrash, HiOutlineBan } from "react-icons/hi";

import ActionButton from "../../Misc/ActionButton";

import "./styles/table_users.css";

const TBodyUser = ({ user, onOpen, setUserToDelete }) => {
	return (
		<Tr fontSize={15} className='table-list-row'>
			<Td className='table-user-td'>{user.id}</Td>
			<Td className='table-user-td'>
				<Badge colorScheme='green' color='green'>
					{user.status.name}
				</Badge>
			</Td>
			<Td className='table-user-td'>
				<Badge colorScheme='purple' color='purple'>
					{user.role.name}
				</Badge>
			</Td>
			<Td className='table-user-td'>{user.username}</Td>
			<Td className='table-user-td'>{user.email}</Td>
			<Td className='table-user-td'>{moment(new Date(user.created_at)).fromNow()}</Td>
			<Td className='table-user-td' fontSize={20}>
				{user.avatar ? (
					<ActionButton
						icon={HiOutlineExternalLink}
						tooltip="Visionner l'avatar"
						hoverBgColor='var(--info-focus)'
						color='var(--info)'
						link={user.avatar.link}
						linkExternal={true}
					/>
				) : (
					<Tooltip hasArrow label='Aucun avatar relié à ce compte' placement='top'>
						<span>
							<Icon color='var(--danger)' as={HiOutlineBan} />
						</span>
					</Tooltip>
				)}
			</Td>
			<Td className='table-user-td'>
				<ActionButton
					icon={HiOutlineEye}
					tooltip='Consulter le profil'
					hoverBgColor='var(--warning-focus)'
					color='var(--warning)'
					link={"/admin/user/" + user.username}
				/>
				{[1, 2].includes(user.role) && (
					<>
						<ActionButton
							icon={HiOutlinePencilAlt}
							tooltip='Éditer'
							hoverBgColor='var(--success-focus)'
							color='var(--success)'
							link={"/admin/user/" + user.username + "/edit"}
						/>
						<ActionButton
							icon={HiTrash}
							tooltip='Supprimer'
							hoverBgColor='var(--danger-focus)'
							color='var(--danger)'
							onClick={() => {
								onOpen();
								setUserToDelete(user.username);
							}}
						/>
					</>
				)}
			</Td>
		</Tr>
	);
};

TBodyUser.propTypes = {
	user: PropTypes.object.isRequired,
	onOpen: PropTypes.func.isRequired,
	setUserToDelete: PropTypes.func.isRequired,
};

export default TBodyUser;
