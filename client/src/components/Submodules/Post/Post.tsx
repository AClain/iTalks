import { FC } from "react";

import { Box, Typography } from "@material-ui/core";
import { Post as PostType } from "api/types/post";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { useStyles } from "./Post.styles";
import moment from "moment";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";
import { RiChat4Line } from "react-icons/ri";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexAlignEnum, FlexDirectionEnum, FlexJustifyEnum } from "components/Elements/Layout/Flex/Flex.d";
import IconWithText from "components/Elements/IconWithText/IconWithText";
import VoteCount from "../VoteCount/VoteCount";

export interface PostProps {
	post: PostType;
}

const Post: FC<PostProps> = ({ post }) => {
	const styles = useStyles();

	const shortenContent = (content: string) => {
		return content.substring(0, 150) + "...";
	};

	return (
		<Flex direction={FlexDirectionEnum.Horizontal} justify={FlexJustifyEnum.SpaceBetween} className={styles.container}>
			<Flex direction={FlexDirectionEnum.Vertical} className={styles.infos}>
				<Flex direction={FlexDirectionEnum.Horizontal}>
					<Title semantic={TitleVariantEnum.H4}>{post.title}</Title>
					<VoteCount votes={post.vote_count} positive={post.user.feedback!} />
				</Flex>

				<Typography className={styles.content}>{shortenContent(post.text)}</Typography>

				<Flex
					align={FlexAlignEnum.Center}
					justify={FlexJustifyEnum.SpaceBetween}
					direction={FlexDirectionEnum.Horizontal}
				>
					<Flex align={FlexAlignEnum.Center} direction={FlexDirectionEnum.Horizontal}>
						<ResetLink to={`/user/${post.user.id}`}>
							<Typography className={styles.user}>{post.user.username}</Typography>
						</ResetLink>
						<Typography className={styles.date}>{moment(post.created_at).fromNow()}</Typography>
					</Flex>
					<Box>
						<IconWithText icon={<RiChat4Line fontSize='18px' />} label={post.comment_count.toString()} />
					</Box>
				</Flex>
			</Flex>
			{post.assiociated_resources ? (
				<img src={post.assiociated_resources[0].link} alt='post img' className={styles.image} />
			) : null}
		</Flex>
	);
};

export default Post;
