import { Box } from "@material-ui/core";
import { api } from "api/api.request";
import { Post } from "api/types/post";
import { FC, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

interface MatchParams {
	id: string;
}

const CategoryPage: FC<{}> = () => {
	let match = useRouteMatch<MatchParams>("/category/:id");
	console.log(match);

	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		setLoading(true);

		if (match) {
			api.category
				.get(parseInt(match.params.id))
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.error(err);
				})
				.finally(() => {
					setLoading();
				});
		}

		return () => {};
	}, [match?.params.id]);

	return <Box>{match && <h1>Catégorie : {match.params.id}</h1>}</Box>;
};

export default CategoryPage;
