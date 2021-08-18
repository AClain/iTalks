// React
import { FC } from "react";
// Librairies
import { BottomNavigation, BottomNavigationAction, Box } from "@material-ui/core";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { IconName } from "react-icons";

const Settings: FC<{}> = () => {
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

export default Settings;
