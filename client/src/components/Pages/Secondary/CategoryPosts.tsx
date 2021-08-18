import { Box } from "@material-ui/core";
import { api } from "api/api.request";
import { Search } from "api/types/api";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import PostList from "components/Modules/PostList/PostList";
import { FC, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

interface MatchParams {
	name: string;
}

const CategoryPosts: FC<{}> = () => {
	let match = useRouteMatch<MatchParams>("/category/:name");

	const [reload, setReload] = useState(false);

	const fetchCategoryPosts = (options: Search) => {
		return api.category.get(match!.params.name, options);
	};

	useEffect(() => {
		setReload(!reload);
		return () => {};
	}, [match?.params.name]);

	return (
		<>
			{match && (
				<Box width='100%'>
					<Title style={{ marginBottom: "25px" }} semantic={TitleVariantEnum.H3}>
						Catégorie: {match.params.name}
					</Title>
					<PostList fetchPosts={fetchCategoryPosts} reload={reload} />
				</Box>
			)}
		</>
	);
};

export default CategoryPosts;
