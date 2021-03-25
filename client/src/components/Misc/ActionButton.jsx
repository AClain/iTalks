import { IconButton, Icon } from "@chakra-ui/react";

export default function ActionButton(props) {
  return (
    <IconButton
      colorScheme={props.color}
      title={props.title}
      variant="ghost"
      fontSize={20}
      m="0px 2px"
      icon={<Icon color={props.color} as={props.icon} />}
      onClick={props.onClick}
    />
  );
}
