import { Box } from "@material-ui/core";
import { api } from "api/api.request";
import { Search } from "api/types/api";
import { AxiosError } from "axios";
import PostList from "components/Modules/PostList/PostList";
import CenteredTabs from "components/Submodules/Tabs/CenteredTabs/CenteredTabs";
import { FC, useEffect, useState } from "react";
import { HiTrendingUp, HiLightBulb } from "react-icons/hi";
import { MdNewReleases } from "react-icons/md";

const Home: FC<{}> = () => {
	const fakePosts = [
		{
			assiociated_resources: [],
			created_at: "2021-01-02T23:35:26.000000Z",
			updated_at: "2021-01-02T23:35:26.000000Z",
			is_edited: false,
			comment_count: 531,
			status: "actif",
			id: 9,
			text:
				"Commodo ad laborum nisi Lorem. Mollit deserunt velit anim reprehenderit. In esse velit duis sint. Proident cillum nisi et laborum ad ut exercitation reprehenderit aliqua voluptate.",
			title: "Un super post",
			user: {
				id: 1,
				username: "user45978",
				feedback: null,
			},
			vote_count: 3694,
		},
		{
			assiociated_resources: [
				{
					id: 1,
					link:
						"https://images.unsplash.com/photo-1591488320449-011701bb6704?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
					name: "image.png",
					created_at: "2021-06-28T23:35:26.000000Z",
					updated_at: "2021-06-28T23:35:26.000000Z",
					status: "actif",
				},
			],
			created_at: "2021-06-28T23:35:26.000000Z",
			updated_at: "2021-06-28T23:35:26.000000Z",
			is_edited: false,
			comment_count: 5,
			status: "actif",
			id: 9,
			text:
				"Commodo ad laborum nisi Lorem. Mollit deserunt velit anim reprehenderit. In esse velit duis sint. Proident cillum nisi et laborum ad ut exercitation reprehenderit aliqua voluptate.",
			title: "Un super post",
			user: {
				id: 1,
				username: "user45978",
				feedback: true,
			},
			vote_count: 350,
		},
		{
			assiociated_resources: [],
			created_at: "2021-06-28T23:35:26.000000Z",
			updated_at: "2021-06-28T23:35:26.000000Z",
			is_edited: false,
			comment_count: 34,
			status: "actif",
			id: 9,
			text:
				"Commodo ad laborum nisi Lorem. Mollit deserunt velit anim reprehenderit. In esse velit duis sint. Proident cillum nisi et laborum ad ut exercitation reprehenderit aliqua voluptate.",
			title: "Un super post",
			user: {
				id: 1,
				username: "user45978",
				feedback: false,
			},
			vote_count: 124,
		},
	];

	const tabHeaders = [
		{ title: "Récent", icon: <MdNewReleases fontSize='24px' />, color: "var(--info)" },
		{ title: "Populaire", icon: <HiTrendingUp fontSize='24px' />, color: "var(--warning)" },
		{ title: "Publier", icon: <HiLightBulb fontSize='24px' />, color: "var(--success)" },
	];
	const tabPanels = [<PostList posts={fakePosts} />, "Populaire", "Publier"];

	const [posts, setPosts] = useState([]);
	const [options, setOptions] = useState<Search>({
		page: 1,
		limit: 25,
		search: "",
	});

	useEffect(() => {
		api.post
			.recent(options)
			.then((res) => console.log(res))
			.catch((err: AxiosError) => console.error(err));

		return () => {
			setPosts([]);
		};
	}, [options]);

	return (
		<Box width='100%'>
			<CenteredTabs tabHeaders={tabHeaders} tabPanels={tabPanels} fontSize='50px'></CenteredTabs>
		</Box>
	);
};

export default Home;
