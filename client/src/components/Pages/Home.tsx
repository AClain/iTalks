import { Box } from "@material-ui/core";
import PostList from "components/Modules/PostList/PostList";
import CenteredTabs from "components/Submodules/Tabs/CenteredTabs/CenteredTabs";
import { FC } from "react";

const Home: FC<{}> = () => {
	const tabHeaders = [
		{ title: "Récent", color: "var(--info)" },
		{ title: "Populaire", color: "var(--warning)" },
		{ title: "Publier", color: "var(--success)" },
	];

	return (
		<Box width='100%'>
			<CenteredTabs
				tabHeaders={tabHeaders}
				tabPanels={[<PostList />, <CategoryList />, "Publier"]}
				fontSize='50px'
			></CenteredTabs>
		</Box>
	);
};

export default Home;
