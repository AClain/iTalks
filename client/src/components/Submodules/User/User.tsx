import { FC } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { User as UserType } from "api/types/user";
import Avatar from "components/Elements/Avatar/Avatar";

export interface UserProps {
	user: UserType;
	[x: string]: any;
}

const User: FC<UserProps> = ({ user }) => {
	return (
		<ListItem button key={user.id}>
			<ListItemIcon>
				<Avatar username={user.username} link={user.avatar} />
			</ListItemIcon>
			<ListItemText primary={user.username}>{user.username}</ListItemText>
		</ListItem>
	);
};

export default User;
