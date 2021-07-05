import { IconButton } from "@material-ui/core";
import Loading from "components/Elements/Animations/Loading/Loading";
import Flex, { FlexAlignEnum, FlexDirectionEnum, FlexJustifyEnum } from "components/Elements/Layout/Flex/Flex";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { FC, useEffect, useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import { useStyles } from "./Logout.styles";

const Logout: FC<{}> = () => {
	const styles = useStyles();

	const [loading, setLoading] = useState(true);
	const [refresh, setRefresh] = useState(false);

	const reload = () => {
		setRefresh(!refresh);
	};

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
		return () => {
			setLoading(true);
		};
	}, [refresh]);

	return (
		<Flex
			direction={FlexDirectionEnum.Vertical}
			align={FlexAlignEnum.Center}
			justify={FlexJustifyEnum.End}
			width='100%'
		>
			<img src='/assets/images/logout_floating.svg' alt='floating' className={styles.floating} />
			<img src='/assets/images/logout_sleeping.svg' alt='sleeping' className={styles.sleeping} />
			<Title semantic={TitleVariantEnum.H2}>Déconnexion</Title>
			{loading ? (
				<Loading radius={15} />
			) : (
				<IconButton onClick={reload} className={styles.refresh}>
					<HiOutlineRefresh />
				</IconButton>
			)}
		</Flex>
	);
};

export default Logout;
