// React
import { FC } from "react";
// Librairies
import { Box } from "@material-ui/core";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";

const Search: FC<{}> = () => {
	return (
		<Box width='100%'>
			<Title semantic={TitleVariantEnum.H1}>Recherche</Title>
		</Box>
	);
};

export default Search;
