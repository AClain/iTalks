import { FC } from "react";
import { List, styled } from "@material-ui/core";
import { User as UserType } from "api/types/user";
import User from "components/Submodules/User/User";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";
import { useStyles } from "./UserList.styles";

export interface UserListProps {
	users: UserType[];
	selectedUserId: string;
}

const UserList: FC<UserListProps> = ({ users, selectedUserId }) => {
	const styles = useStyles();

	console.log(parseInt(selectedUserId));

	return (
		<List>
			{users.map((u, i) => (
				<ResetLink key={i} to={`/messages/${u.id}`}>
					<User className={`${parseInt(selectedUserId) === u.id ? styles.selected : null}`} user={u} />
				</ResetLink>
			))}
		</List>
	);
};

export default UserList;
