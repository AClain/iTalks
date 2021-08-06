import { Message } from "api/types/message";
import { FC } from "react";
import { List, Grid, ListItem, ListItemText } from "@material-ui/core";
import moment from "moment";
import { useStyles } from "./MessageList.styles";
import auth from "api/auth";

interface MessageListProps {
	messages: Message[];
}

const MessageList: FC<MessageListProps> = ({ messages }) => {
	const styles = useStyles();

	const displayTime = (timestamp: string) => {
		console.log(timestamp);

		const timestampFormatted = moment(timestamp).format("DD-MM-YYYY");
		const nowFormatted = moment().format("DD-MM-YYYY");

		if (timestampFormatted !== nowFormatted) {
			return moment(timestamp).format("DD-MM-YYYY kk:mm");
		}

		return moment(timestamp).format("kk:mm");
	};

	console.log(auth.getUserId());

	return (
		<List>
			{messages.map((m, k) => (
				<ListItem key={k}>
					<Grid container>
						<Grid item xs={12}>
							<ListItemText
								secondaryTypographyProps={{ className: styles.timestamp }}
								secondary={displayTime(m.created_at)}
								className={`${auth.getUserId() === m.sender.id && styles.sender}`}
							>
								{m.message}
							</ListItemText>
						</Grid>
					</Grid>
				</ListItem>
			))}
		</List>
	);
};

export default MessageList;
