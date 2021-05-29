import PropTypes from "prop-types";

import { Thead, Tr, Th } from "@chakra-ui/react";

const THeadCustom = ({ titles }) => {
	return (
		<Thead bgColor='main.purple'>
			<Tr>
				{titles.map((title, i) => (
					<Th color='var(--text)' textAlign='center' whiteSpace='nowrap' fontSize={15} key={i}>
						{title}
					</Th>
				))}
			</Tr>
		</Thead>
	);
};

THeadCustom.propTypes = {
	titles: PropTypes.array.isRequired,
};

export default THeadCustom;
