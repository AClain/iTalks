import { Box } from "@material-ui/core";
import { FC, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

interface MatchParams {
	id: string;
}

const CategoryPage: FC<{}> = () => {
	let match = useRouteMatch<MatchParams>("/category/:id");
	console.log(match);

	useEffect(() => {
		return () => {};
	}, [match?.params.id]);

	return <Box>{match && <h1>Catégorie : {match.params.id}</h1>}</Box>;
};

export default CategoryPage;
