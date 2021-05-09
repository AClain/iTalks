import moment from "moment";
import "moment/locale/fr";

import { Tr, Td } from "@chakra-ui/react";
import { IconButton, Icon, Badge } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";

import {
  HiOutlineExternalLink,
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiTrash,
  HiOutlineBan,
} from "react-icons/hi";

import LinkTo from "../../Misc/LinkTo";
import ActionButton from "../../Misc/ActionButton";

import "./styles/table_users.css";

export default function TBodyUser(props) {
  return (
    <Tr fontSize={15} className="table-list-row">
      <Td className="table-user-td">{props.user.id}</Td>
      <Td className="table-user-td">
        <Badge colorScheme="green" color="green">
          {props.user.status.name}
        </Badge>
      </Td>
      <Td className="table-user-td">
        <Badge colorScheme="purple" color="purple">
          {props.user.role.name}
        </Badge>
      </Td>
      <Td className="table-user-td">{props.user.username}</Td>
      <Td className="table-user-td">{props.user.email}</Td>
      <Td className="table-user-td">
        {moment(new Date(props.user.created_at)).fromNow()}
      </Td>
      <Td className="table-user-td" fontSize={20}>
        {props.user.avatar ? (
          <ActionButton
            icon={HiOutlineExternalLink}
            tooltip="Visionner l'avatar"
            hoverBgColor="var(--info-focus)"
            color="var(--info)"
            link={props.user.avatar.link}
            linkExternal={true}
          />
        ) : (
          <Tooltip
            hasArrow
            label="Aucun avatar relié à ce compte"
            placement="top"
          >
            <span>
              <Icon color="var(--danger)" as={HiOutlineBan} />
            </span>
          </Tooltip>
        )}
      </Td>
      <Td className="table-user-td">
        <ActionButton
          icon={HiOutlineEye}
          tooltip="Consulter le profil"
          hoverBgColor="var(--warning-focus)"
          color="var(--warning)"
          link={"/admin/user/" + props.user.username}
        />
        {props.user.role.id === 1 || props.user.role.id === 2 ? null : (
          <>
            <ActionButton
              icon={HiOutlinePencilAlt}
              tooltip="Éditer"
              hoverBgColor="var(--success-focus)"
              color="var(--success)"
              link={"/admin/user/" + props.user.username + "/edit"}
            />
            <ActionButton
              icon={HiTrash}
              tooltip="Supprimer"
              hoverBgColor="var(--danger-focus)"
              color="var(--danger)"
              onClick={() => {
                props.onOpen();
                props.setUserToDelete(props.user.username);
              }}
            />
          </>
        )}
      </Td>
    </Tr>
  );
}
