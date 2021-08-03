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
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { useStyles } from "./ChatBox.styles";

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
			style={{ padding: "0px 5px", color: "var(--text)", borderLeft: "solid 1.25px rgba(255, 255, 255, 0.35)" }}
			direction={FlexDirectionEnum.Vertical}
			width='70%'
		>
			{recipientId ? (
				<>
					<List>
						{messages.map((m, i) => (
							<ListItem key={i}>
								<Grid container>
									<Grid item xs={12}>
										<ListItemText primary={m.message}></ListItemText>
									</Grid>
									<Grid item xs={12}>
										<Typography variant='caption' display='block' gutterBottom>
											{m.created_at}
										</Typography>
									</Grid>
								</Grid>
							</ListItem>
						))}
					</List>
					<Divider />
					<form noValidate autoComplete='off' onSubmit={handleSubmit(send)}>
						<FormControl style={{ width: "100%", borderColor: "red" }} variant='outlined'>
							<OutlinedInput
								id='message'
								type='text'
								multiline
								{...register("message")}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton onClick={send}>
											<BiSend color='var(--text)' />
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
