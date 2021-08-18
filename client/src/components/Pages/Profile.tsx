// React
import {FC, useEffect, useState} from "react";
// Librairies
import {Box, Grid} from "@material-ui/core";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import UserCard from "components/Submodules/Profile/UserCard/UserCard";
import {api} from "../../api/api.request";
import {UserProfil} from "../../api/types/user";
import BadgeCard from "../Submodules/Profile/BadgeCard/BadgeCard";

const Profile: FC<{}> = () => {

	const [user, setUser] = useState<UserProfil | null >(null)

	useEffect( () => {
		api.user.profil().then( (res) => {
			console.log(res.data)
			setUser(res.data)
		}).catch( (err) => {
			console.error(err)
		})
	}, [])
	return (
		<Box width='100%'>
			<Title semantic={TitleVariantEnum.H1}>Profil</Title>
			<Grid container spacing={2}>
				{user ? (<UserCard user={user}/>) : (<p>Ce profile n'existe pas.</p>)}
				{user ? (<BadgeCard user={user}/>) : (<p>Ce profile n'a pas badge</p>)}
			</Grid>
		</Box>
	);
};

export default Profile;
