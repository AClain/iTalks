// React
import {FC, useEffect, useState} from "react";
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";
// Librairies
import { Box } from "@material-ui/core";
// Components
import Title from "components/Elements/Typograhpy/Title/Title";
import {TitleVariantEnum} from "components/Elements/Typograhpy/Title/Title.d";
import UserCard from "components/Submodules/Profile/UserCard/UserCard";
import BadgeCard from "components/Submodules/Profile/BadgeCard/BadgeCard";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d"

// Api
import {api} from "../../api/api.request";
import {UserProfil} from "../../api/types/user";
import auth from "api/auth"

import CenteredTabs from "../Submodules/Tabs/CenteredTabs/CenteredTabs";


interface MatchParams {
    id: string
}

const Profile: FC<{}> = () => {
    const match = useRouteMatch<MatchParams>("/profile/:id");
    let history = useHistory()
    const [user, setUser] = useState<UserProfil | null>(null)

    let location = useLocation();

    const currentPath = location.pathname;

    const tabHeaders = [
        { title: "Récent", color: "var(--info)" },
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
                    {user ? (<UserCard user={user} setUser={setUser}/>) : (<p>Ce profile n'existe pas.</p>)}
                    {user ? (<BadgeCard user={user}/>) : (<p>Ce profile n'a pas badge.</p>)}
                </Box>
                <Box width='65%'>
                    <Box p='25px' boxShadow='var(--medium-box-shadow)'>
                        <Flex direction={FlexDirectionEnum.Vertical}>
                            {/* <CenteredTabs
                                activeTab={currentActiveTab()}
                                tabHeaders={tabHeaders}
                                tabPanels={[<UserProfilePosts userId={user.id} />, <UserProfileComments userId={user.id}/>]}
                            /> */}
                        </Flex>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default Profile;
