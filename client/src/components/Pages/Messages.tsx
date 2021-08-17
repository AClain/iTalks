// React
import { FC, useEffect, useState } from "react";
// Librairies
import { ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import Avatar from "components/Elements/Avatar/Avatar";
import { useStyles } from "./Messages.styles";
import UserList from "components/Modules/UserList/UserList";
import { UserShort } from "api/types/user";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { HiOutlineSearch } from "react-icons/hi";
import ChatBox from "components/Modules/ChatBox/ChatBox";
import auth from "api/auth";
import { useParams, useHistory } from "react-router-dom";
import { api } from "api/api.request";
import _ from "lodash";
import FormControl from "components/Elements/Form/FormControl/FormControl";
import { Search } from "api/types/api";

type MessageParams = {
	id: string;
};

const Messages: FC<{}> = () => {
	const styles = useStyles();
	// React router
	const history = useHistory();
	let { id } = useParams<MessageParams>();
	// States
	const [users, setUsers] = useState<UserShort[]>([]);
	const [searchUsers, setSearchUsers] = useState<UserShort[]>([]);
	const [fetchingUsers, setFetchingUsers] = useState(true);

	const handleSearch = (e: any): any => {
		const search: Search = {
			limit: 10,
			page: 1,
			search: e.target.value,
		};

		if (e.target.value.length > 1) {
			api.user
				.search(search)
				.then((res) => {
					console.log(res.data.items);
					setSearchUsers(res.data.items);
				})
				.catch((err) => {
					console.error(err);
				});

			return true;
		}

		setSearchUsers([]);

		return false;
	};

	useEffect(() => {
		setFetchingUsers(true);

		api.message
			.all()
			.then((res) => {
				setUsers(res.data.items);
				console.log(res.data.items);
				if (_.findIndex(res.data.items, { id: parseInt(id) }) === -1) {
					history.push("/messages");
				}
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setFetchingUsers(false);
			});
	}, []);

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

				<FormControl
					label='Rechercher un utilisateur'
					type='text'
					identifier='search'
					startIcon={<HiOutlineSearch />}
					onKeyUp={_.debounce(handleSearch, 250)}
					fullWidth
				></FormControl>

				<Divider />

				<UserList selectedUserId={id} users={searchUsers.length > 0 ? searchUsers : users} />
			</Flex>
			<ChatBox fetchingUsers={fetchingUsers} recipientId={parseInt(id)} />
		</Flex>
	);
};

export default Messages;
