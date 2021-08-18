// React
import {FC, useEffect, useState} from "react";
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";
// Librairies
import {Box} from "@material-ui/core";
// Components
import Title from "components/Elements/Typograhpy/Title/Title";
import UserInfo from "components/Submodules/Profile/UserInfo/UserInfo";
import BadgeList from "components/Submodules/Profile/BadgeList/BadgeList";
import Flex from "components/Elements/Layout/Flex/Flex";
import CenteredTabs from "components/Submodules/Tabs/CenteredTabs/CenteredTabs";
import UserProfilePosts from "components/Modules/Profile/UserProfilePosts/UserProfilePosts";
import UserProfileComments from "components/Modules/Profile/UserProfileComments/UserProfileComments";
import {FlexDirectionEnum} from "components/Elements/Layout/Flex/Flex.d"
import {TitleVariantEnum} from "components/Elements/Typograhpy/Title/Title.d";
// Api
import {api} from "../../api/api.request";
import {UserProfil} from "../../api/types/user";
import auth from "api/auth"

interface MatchParams {
	id: string
}

const Profile: FC<{}> = () => {
	const match = useRouteMatch<MatchParams>("/profile/:id");
	let history = useHistory()
	const [user, setUser] = useState<UserProfil | null>(null)

	const tabHeaders = [
		{ title: "Posts", color: "var(--info)" },
		{ title: "Commentaire", color: "var(--warning)" }
	];

	const currentActiveTab = () => {
		return 0
	}

	useEffect(() => {
		if (match) {
			if (auth.getUserId() === parseInt(match.params.id)) {
				history.push('/profile')
				return
			}
			api.user.get(parseInt(match.params.id)).then((res) => {
				console.log(res.data)
				setUser(res.data)
			}).catch((err) => {
				console.error(err)
			})
		}
		else {
			api.user.profil().then((res) => {
				console.log(res.data)
				setUser(res.data)
			}).catch((err) => {
				console.error(err)
			})
		}
	}, [])
	return (
		<Box width='100%'>
			<Title semantic={TitleVariantEnum.H1}>Profil</Title>
			<Flex p='25px' direction={FlexDirectionEnum.Horizontal}>
				<Box mr="10px" width='35%'>
					{user ? (<UserInfo user={user} setUser={setUser}/>) : (<p>Ce profile n'existe pas.</p>)}
					{user ? (<BadgeList user={user}/>) : (<p>Ce profile n'a pas badge.</p>)}
				</Box>
				<Box width='65%'>
					<Box p='25px' boxShadow='var(--medium-box-shadow)'>
						<Flex direction={FlexDirectionEnum.Vertical}>
							<CenteredTabs
                                activeTab={currentActiveTab()}
                                tabHeaders={tabHeaders}
                                tabPanels={[<UserProfilePosts userId={user.id} />, <UserProfileComments userId={user.id}/>]}
                            />
						</Flex>
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};

export default Profile;
