import { useEffect, useState } from "react";
import User from "../../api/User";

import { Flex } from "@chakra-ui/react";
import { Image, Progress } from "@chakra-ui/react";

import TopContainer from "../Misc/TopContainer";
import ProfilTabs from "./ProfilTabs/ProfilTabs";
import BadgeList from "../Misc/Badges/BadgeList";

const Profil = () => {
	const [profil, setProfil] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		User.profil()
			.then((data) => {
				console.log(data);
				setProfil(data.data);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<TopContainer alignItems='center'>
			<Flex w='90%'>
				{loading ? (
					<Progress size='xs' isIndeterminate />
				) : (
					<>
						<Flex w='30%' direction='column' align='center'>
							<Image w='250px' h='250px' objectFit='cover' borderRadius='50%' src={profil.info.avatar} />
							<BadgeList badges={profil.info.badges} />
						</Flex>
						<ProfilTabs profil={profil} />
					</>
				)}
			</Flex>
		</TopContainer>
	);
};

export default Profil;
