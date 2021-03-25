import moment from "moment";
import "moment/locale/fr";

import { Tr, Td } from "@chakra-ui/react";

import { IconButton, Icon, Badge } from "@chakra-ui/react";

import {
  HiOutlineExternalLink,
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlineXCircle,
  HiOutlineBan,
} from "react-icons/hi";

import LinkTo from "../../Misc/LinkTo";
import ActionButton from "../../Misc/ActionButton";

import "./styles/table_users.css";

export default function TBodyUser(props) {
  return (
    <Tr fontSize={15} className="table-list-row">
      <Td className="table_user_td">{props.user.id}</Td>
      <Td className="table_user_td">
        <Badge colorScheme="green" color="green">
          {props.user.status.name}
        </Badge>
      </Td>
      <Td className="table_user_td">
        <Badge colorScheme="purple" color="purple">
          {props.user.role.name}
        </Badge>
      </Td>
      <Td className="table_user_td">{props.user.username}</Td>
      <Td className="table_user_td">{props.user.email}</Td>
      <Td className="table_user_td">
        {moment(new Date(props.user.created_at)).fromNow()}
      </Td>
      <Td
        color="main.dark"
        textAlign="center"
        whiteSpace="nowrap"
        fontSize={20}
      >
        {props.user.avatar ? (
          <LinkTo to={props.user.avatar.link} external={true}>
            <IconButton
              colorScheme="blue"
              title="Visionner l'avatar"
              variant="ghost"
              fontSize={20}
              m="0px 2px"
              icon={<Icon as={HiOutlineExternalLink} />}
            />
          </LinkTo>
        ) : (
          <Icon color="red.500" as={HiOutlineBan} />
        )}
      </Td>
      <Td className="table_user_td">
        <LinkTo to={"/admin/user/" + props.user.username}>
          <ActionButton title="Consulter" icon={HiOutlineEye} color="gray" />
        </LinkTo>
        {props.user.role.id === 1 || props.user.role.id === 2 ? null : (
          <>
            <LinkTo to={"/admin/user/" + props.user.username + "/edit"}>
              <ActionButton
                title="Éditer"
                icon={HiOutlinePencilAlt}
                color="green"
              />
            </LinkTo>
            <LinkTo to="#">
              <ActionButton
                title="Supprimer"
                icon={HiOutlineXCircle}
                color="red"
                onClick={() => {
                  props.onOpen();
                  props.setUserToDelete(props.user.username);
                }}
              />
            </LinkTo>
          </>
        )}
      </Td>
    </Tr>
  );
}
