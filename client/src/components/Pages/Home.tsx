import { Box } from "@material-ui/core";
import CategoryList from "components/Modules/CategoryList/CategoryList";
import PostList from "components/Modules/PostList/PostList";
import CenteredTabs from "components/Submodules/Tabs/CenteredTabs/CenteredTabs";
import { FC } from "react";
import { useLocation } from "react-router-dom";

const Home: FC<{}> = () => {
	let location = useLocation();
	const currentPath = location.pathname;

	const tabHeaders = [
		{ title: "Récent", color: "var(--info)" },
		{ title: "Catégories", color: "var(--warning)" },
		{ title: "Publier", color: "var(--success)" },
	];

	const currentActiveTab = () => {
		console.log(currentPath);
		if (["/", "/home", "/recent"].includes(currentPath)) {
			return 0;
		}

		if (currentPath.includes("categories")) {
			return 1;
		}

		return 2;
	};

	return (
		<Box width='100%'>
			<CenteredTabs
				activeTab={currentActiveTab()}
				tabHeaders={tabHeaders}
				tabPanels={[<PostList />, <CategoryList />, "Publier"]}
			></CenteredTabs>
		</Box>
	);
};

export default Home;
