import PropTypes from "prop-types";

import moment from "moment";

import { Tr, Td } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";

import { HiOutlineEye, HiOutlinePencilAlt, HiTrash } from "react-icons/hi";

import ActionButton from "../../Misc/Buttons/ActionButton";

import "./styles/table_statuses.scss";

const TRowStatus = ({ status, onOpen, setStatusToDelete }) => {
	return (
		<Tr fontSize={15} className='table-list-row'>
			<Td className='table-status-td'>{status.id}</Td>
			<Td className='table-user-td'>
				<Badge colorScheme='purple' color='purple'>
					{status.name}
				</Badge>
			</Td>
			<Td className='table-user-td'>{moment(new Date(status.created_at)).fromNow()}</Td>
			<Td className='table-user-td'>
				<ActionButton
					icon={HiOutlineEye}
					tooltip='Consulter le profil'
					hoverBgColor='var(--warning-focus)'
					color='var(--warning)'
					link={"/admin/user/" + status.id}
				/>
				<ActionButton
					icon={HiOutlinePencilAlt}
					tooltip='Éditer'
					hoverBgColor='var(--success-focus)'
					color='var(--success)'
					link={"/admin/user/" + status.id + "/edit"}
				/>
				<ActionButton
					icon={HiTrash}
					tooltip='Supprimer'
					hoverBgColor='var(--danger-focus)'
					color='var(--danger)'
					onClick={() => {
						onOpen();
						setStatusToDelete(status.id);
					}}
				/>
			</Td>
		</Tr>
	);
};

TRowStatus.propTypes = {
	status: PropTypes.object.isRequired,
	onOpen: PropTypes.func.isRequired,
	setStatusToDelete: PropTypes.func.isRequired,
};

export default TRowStatus;
