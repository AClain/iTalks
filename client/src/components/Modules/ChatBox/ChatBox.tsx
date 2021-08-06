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
	Typography,
} from "@material-ui/core";
import { Message as MessageType } from "api/types/message";
import { FlexAlignEnum, FlexDirectionEnum, FlexJustifyEnum } from "components/Elements/Layout/Flex/Flex.d";
import { BiSend } from "react-icons/bi";
import Flex from "components/Elements/Layout/Flex/Flex";
import { useForm } from "react-hook-form";
import { useStyles } from "./ChatBox.styles";
import MessageList from "../MessageList/MessageList";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";

export interface ChatBoxProps {
	messages: MessageType[];
	recipientId: string;
}

const ChatBox: FC<ChatBoxProps> = ({ messages, recipientId }) => {
	const styles = useStyles();
	// Hook form
	const { register, handleSubmit, getValues } = useForm();
	// Custom methods
	const send = (data: any) => {
		console.log(getValues("message"));
	};

	console.log(recipientId);

	return (
		<Flex
			style={{ padding: "0px 5px", color: "var(--text)", justifyContent: "flex-end" }}
			direction={FlexDirectionEnum.Vertical}
			width='70%'
		>
			{recipientId ? (
				<>
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
				</>
			) : (
				<Flex
					direction={FlexDirectionEnum.Vertical}
					justify={FlexJustifyEnum.Center}
					align={FlexAlignEnum.Center}
					height='100%'
				>
					<Title semantic={TitleVariantEnum.H6}>Vous n'avez pas sélectionné de destinataire.</Title>
					<Typography>Sélectionnez un destinataire existant ou commencez une nouvelle conversation.</Typography>
				</Flex>
			)}
		</Flex>
	);
};

export default ChatBox;
