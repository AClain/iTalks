import { Box, Typography } from "@material-ui/core";
import { Comment as CommentType } from "api/types/comment";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexAlignEnum, FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import { FC } from "react";
import Avatar from "components/Elements/Avatar/Avatar";
import moment from "moment";
import BullDivider from "components/Elements/Layout/BullDivider/BullDivider";
import { useStyles } from "./Comment.styles";

interface CommentProps {
	comment: CommentType;
	[x: string]: any;
}

const Comment: FC<CommentProps> = ({ comment, ...rest }) => {
	const styles = useStyles();

	return (
		<Box className={styles.container} {...rest}>
			<Flex className={styles.userInfos} direction={FlexDirectionEnum.Horizontal} align={FlexAlignEnum.Center}>
				<Avatar username={comment.user.username} link={comment.user.avatar} />
				<Typography component='pre' style={{ marginLeft: "15px" }}>
					{comment.user.username}
				</Typography>
				<BullDivider />
				<Typography className={styles.timestamp}>{moment(comment.created_at).fromNow()}</Typography>
			</Flex>
			<Typography>{comment.text}</Typography>
		</Box>
	);
};

export default Comment;
