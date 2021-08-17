import { FC } from "react";
import { Box } from "@material-ui/core";
import { User as UserType } from "api/types/user";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FlexAlignEnum, FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import Flex from "components/Elements/Layout/Flex/Flex";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";
import { useStyles } from "./UserSearchResults.styles";
import Avatar from "components/Elements/Avatar/Avatar";

interface UserSearchResultsProps {
	dataUsers: {
		users: UserType[];
		total: number;
	};
}

const UserSearchResults: FC<UserSearchResultsProps> = ({ dataUsers }) => {
	const styles = useStyles();

	return (
		<Box className={styles.container}>
			<HiOutlineUserCircle fontSize='50px' />
			<Title semantic={TitleVariantEnum.H5}>{dataUsers.total + " utilisateurs(s) trouvé(s)"}</Title>
			{dataUsers.total > 0 &&
				dataUsers.users.map((u, k) => (
					<Flex
						className={styles.userContainer}
						key={k}
						direction={FlexDirectionEnum.Horizontal}
						align={FlexAlignEnum.Center}
					>
						<Avatar username={u.username} link={u.avatar.link} />
						<Title semantic={TitleVariantEnum.H6} className={styles.username}>
							{u.username}
						</Title>
					</Flex>
				))}
			{/* <Paginate /> */}
		</Box>
	);
};

export default UserSearchResults;
