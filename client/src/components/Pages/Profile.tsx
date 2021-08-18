// React
import { FC, useEffect } from "react";
// Librairies
import { Box } from "@material-ui/core";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { useRouteMatch } from "react-router-dom";
import { api } from "api/api.request";
import auth from "api/auth";
import CenteredTabs from "components/Submodules/Tabs/CenteredTabs/CenteredTabs";

interface MatchParams {
	id: string;
}

const Profile: FC<{}> = () => {
	return <Box></Box>;
};

export default Profile;
