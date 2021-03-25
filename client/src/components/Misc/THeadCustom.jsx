import { Thead, Tr, Th } from "@chakra-ui/react";

export default function THeadCustom(props) {
  return (
    <Thead bgColor="main.purple">
      <Tr>
        {props.titles.map((title, i) => (
          <Th
            color="main.light"
            textAlign="center"
            whiteSpace="nowrap"
            fontSize={15}
            key={i}
          >
            {title}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
}
