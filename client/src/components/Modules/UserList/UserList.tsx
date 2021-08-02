import { FC } from "react";
import { List } from "@material-ui/core";
import { User as UserType } from "api/types/user";
import User from "components/Submodules/User/User";

export interface UserListProps {
	users: UserType[];
}

const UserList: FC<UserListProps> = ({ users }) => {
	return (
		<List>
			{users.map((u, i) => (
				<User user={u} key={i} />
			))}
		</List>
	);
};

export default UserList;
