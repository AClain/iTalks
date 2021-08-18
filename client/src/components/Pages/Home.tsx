import { Box } from "@material-ui/core";
import { api } from "api/api.request";
import { Search } from "api/types/api";
import CategoryList from "components/Modules/CategoryList/CategoryList";
import PostList from "components/Modules/PostList/PostList";
import CenteredTabs from "components/Submodules/Tabs/CenteredTabs/CenteredTabs";
import { FC, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

const Home: FC<{}> = () => {
	// React router
	let history = useHistory();
	let location = useLocation();
	const currentPath = location.pathname;
	// States
	const [currentTab, setCurrentTab] = useState(0);
	// Variables
	const tabHeaders = [
		{ title: "Récent", color: "var(--info)" },
		{ title: "Catégories", color: "var(--warning)" },
		{ title: "Publier", color: "var(--success)" },
	];
	// Functions
	const handleChange = (event: any, newValue: number): void => {
		setCurrentTab(newValue);

		switch (newValue) {
			case 1:
				history.push("/categories");
				break;
			case 2:
				history.push("/new");
				break;
			default:
				history.push("/home");
				break;
		}
	};
	const getCurrentActiveTab = (url: string) => {
		if (["/", "/home", "/recent"].includes(url)) {
			return 0;
		}

		if (url.includes("categories")) {
			return 1;
		}

		return 2;
	};
	const fetchFeed = (options: Search) => {
		return api.post.feed(options);
	};
	// Effects
	useEffect(() => {
		setCurrentTab(getCurrentActiveTab(currentPath));
		return () => {};
	}, [currentPath]);

	return (
		<Box width='100%'>
			<CenteredTabs
				currentTab={currentTab}
				tabHeaders={tabHeaders}
				tabPanels={[<PostList fetchPosts={fetchFeed} />, <CategoryList />, "Publier"]}
				handleChange={handleChange}
			></CenteredTabs>
		</Box>
	);
};

export default Home;
