import { IconButton, Icon, Tooltip } from "@chakra-ui/react";
import LinkTo from "./LinkTo";

export default function ActionButton(props) {
  return (
    <LinkTo to={props.link ?? "#"} external={props.linkExternal}>
      <Tooltip hasArrow label={props.tooltip} placement="top">
        <span>
          <IconButton
            title={props.title}
            variant="ghost"
            fontSize={20}
            m="0px 2px"
            color={props.color}
            icon={<Icon as={props.icon} />}
            onClick={props.onClick}
            _hover={{ background: props.hoverBgColor, color: "var(--light)" }}
          />
        </span>
      </Tooltip>
    </LinkTo>
  );
}
