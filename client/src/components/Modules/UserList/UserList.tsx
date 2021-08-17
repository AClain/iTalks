import { FC } from "react";
import { List } from "@material-ui/core";
import { UserShort } from "api/types/user";
import User from "components/Submodules/User/User";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";
import { useStyles } from "./UserList.styles";

export interface UserListProps {
	users: UserShort[];
	selectedUserId?: string;
}

const UserList: FC<UserListProps> = ({ users, selectedUserId }) => {
	const styles = useStyles();

	return (
		<List>
			{users.length > 0 &&
				users.map((u, i) => (
					<ResetLink color='inherit' key={i} to={`/messages/${u.id}`}>
						<User
							className={`${
								selectedUserId && parseInt(selectedUserId) === u.id ? styles.selected : styles.notSelected
							}`}
							user={u}
						/>
					</ResetLink>
				))}
		</List>
	);
};

export default UserList;
