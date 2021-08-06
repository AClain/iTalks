import { FC } from "react";
import {
	List,
	ListItem,
	Divider,
	FormControl,
	OutlinedInput,
	InputAdornment,
	IconButton,
	ListItemText,
	Grid,
} from "@material-ui/core";
import { Message as MessageType } from "api/types/message";
import { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { BiSend } from "react-icons/bi";
import Flex from "components/Elements/Layout/Flex/Flex";
import { useForm } from "react-hook-form";
import { useStyles } from "./ChatBox.styles";
import MessageList from "../MessageList/MessageList";

export interface ChatBoxProps {
	messages: MessageType[];
}

const ChatBox: FC<ChatBoxProps> = ({ messages }) => {
	const styles = useStyles();
	// Hook form
	const { register, handleSubmit, getValues } = useForm();
	// Custom methods
	const send = (data: any) => {
		console.log(getValues("message"));
	};

	return (
		<Flex
			style={{ padding: "0px 5px", color: "var(--text)", justifyContent: "flex-end" }}
			direction={FlexDirectionEnum.Vertical}
			width='70%'
		>
			<MessageList messages={messages} />

			<Divider />

			<form className={styles.form} noValidate autoComplete='off' onSubmit={handleSubmit(send)}>
				<FormControl className={styles.messageFormControl} variant='outlined'>
					<OutlinedInput
						id='message'
						type='text'
						multiline
						{...register("message")}
						className={styles.messageInput}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton onClick={send}>
									<BiSend className={styles.messageInputIcon} />
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
			</form>
		</Flex>
	);
};

export default ChatBox;
