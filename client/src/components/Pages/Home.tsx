import { Box } from "@material-ui/core";
import { api } from "api/api.request";
import { AxiosError } from "axios";
import PostList from "components/Modules/PostList/PostList";
import CenteredTabs from "components/Submodules/Tabs/CenteredTabs/CenteredTabs";
import { FC, useEffect, useState } from "react";
import { Post } from "api/types/post";

const Home: FC<{}> = () => {
	const tabHeaders = [
		{ title: "Récent", color: "var(--info)" },
		{ title: "Populaire", color: "var(--warning)" },
		{ title: "Publier", color: "var(--success)" },
	];
	const [posts, setPosts] = useState<Post[] | []>([]);

	useEffect(() => {
		api.post
			.feed({
				page: 1,
				limit: 25,
				search: "",
			})
			.then((res) => setPosts(res.data.items))
			.catch((err: AxiosError) => console.error(err));

		return () => {};
	}, []);

	return (
		<Box width='100%'>
			<CenteredTabs
				tabHeaders={tabHeaders}
				tabPanels={[<PostList posts={posts} />, "Populaire", "Publier"]}
				fontSize='50px'
			></CenteredTabs>
		</Box>
	);
};

export default Home;
