// React
import { FC, useState } from "react";
// Librairies
import {
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
} from "@material-ui/core";
import Avatar from "components/Elements/Avatar/Avatar";
import { useStyles } from "./Messages.styles";
import UserList from "components/Modules/UserList/UserList";
import { User as UserType } from "api/types/user";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { HiOutlineSearch } from "react-icons/hi";
import { useForm } from "react-hook-form";
import ChatBox from "components/Modules/ChatBox/ChatBox";
import { Message as MessageType } from "api/types/message";
import auth from "api/auth";

interface SearchError {}

const fakeUsers: UserType[] = [
	{
		id: 1,
		username: "AClain",
		role: "basic",
		avatar: "https://material-ui.com/static/images/avatar/1.jpg",
		created_at: "",
		updated_at: "",
	},
	{
		id: 2,
		username: "JFlacher",
		role: "admin",
		avatar: "https://material-ui.com/static/images/avatar/1.jpg",
		created_at: "",
		updated_at: "",
	},
	{
		id: 3,
		username: "ARoth",
		role: "basic",
		avatar: "https://material-ui.com/static/images/avatar/1.jpg",
		created_at: "",
		updated_at: "",
	},
];

const fakeMessages: MessageType[] = [
	{
		id: 1,
		message: "Yo",
		sender: {
			id: 1,
			username: "AClain",
		},
		status: "actif",
		created_at: "2021-07-06T20:29:26.000000Z",
		updated_at: "2021-07-06T20:29:26.000000Z",
	},
	{
		id: 2,
		message: "Salut",
		sender: {
			id: 3,
			username: "attzetze",
		},
		status: "actif",
		created_at: "2021-07-06T20:29:26.000000Z",
		updated_at: "2021-07-06T20:29:26.000000Z",
	},
];

const Messages: FC<{}> = () => {
	const styles = useStyles();
	// Hook form
	const { register, handleSubmit } = useForm();
	// States
	const [errors, setErrors] = useState<SearchError>({});
	// Custom methods
	const handleChange = (e: any) => {
		console.log(e.target.value);
	};

	return (
		<Flex className={styles.container} direction={FlexDirectionEnum.Horizontal} width='100%'>
			<Flex className={styles.userListContainer} direction={FlexDirectionEnum.Vertical}>
				<ListItem button key='RemySharp'>
					<ListItemIcon>
						<Avatar username={auth.getUsername()} link={auth.getAvatarLink()} />
					</ListItemIcon>
					<ListItemText>{auth.getUsername()}</ListItemText>
				</ListItem>

				<Divider />

				<FormControl style={{ margin: "15px" }}>
					<InputLabel htmlFor='search'>Rechercher</InputLabel>
					<Input
						id='search'
						startAdornment={
							<InputAdornment position='start'>
								<HiOutlineSearch />
							</InputAdornment>
						}
					/>
				</FormControl>

				<Divider />

				<UserList users={fakeUsers} />
			</Flex>
			<ChatBox messages={fakeMessages} />
		</Flex>
	);
};

export default Messages;
