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

export interface ChatBoxProps {
	messages: MessageType[];
}

const ChatBox: FC<ChatBoxProps> = ({ messages }) => {
	// Hook form
	const { register, handleSubmit, getValues } = useForm();
	// Custom methods
	const send = (data: any) => {
		console.log(getValues("message"));
	};

	return (
		<Flex style={{ padding: "0px 5px", color: "var(--text)" }} direction={FlexDirectionEnum.Vertical} width='70%'>
			<List>
				<ListItem key='1'>
					<Grid container>
						<Grid item xs={12}>
							<ListItemText primary="Hey man, What's up ?"></ListItemText>
						</Grid>
						<Grid item xs={12}>
							<ListItemText secondary='09:30'></ListItemText>
						</Grid>
					</Grid>
				</ListItem>
				<ListItem key='2'>
					<Grid container alignContent='flex-end'>
						<Grid item xs={12}>
							<ListItemText primary='Hey, Iam Good! What about you ?'></ListItemText>
						</Grid>
						<Grid item xs={12}>
							<ListItemText secondary='09:31'></ListItemText>
						</Grid>
					</Grid>
				</ListItem>
				<ListItem key='3'>
					<Grid container>
						<Grid item xs={12}>
							<ListItemText primary="Cool. i am good, let's catch up!"></ListItemText>
						</Grid>
						<Grid item xs={12}>
							<ListItemText secondary='10:30'></ListItemText>
						</Grid>
					</Grid>
				</ListItem>
			</List>
			<Divider />
			<form noValidate autoComplete='off' onSubmit={handleSubmit(send)}>
				<FormControl style={{ width: "100%" }} variant='outlined'>
					<OutlinedInput
						id='message'
						type='text'
						multiline
						{...register("message")}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton onClick={send}>
									<BiSend />
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
