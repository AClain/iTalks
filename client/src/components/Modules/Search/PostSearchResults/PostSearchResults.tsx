import { FC } from "react";
import { Box, Typography } from "@material-ui/core";
import { Post as PostType } from "api/types/post";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import IconWithText from "components/Elements/IconWithText/IconWithText";
import { FlexAlignEnum, FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import Flex from "components/Elements/Layout/Flex/Flex";
import ResetLink from "components/Elements/Typograhpy/Link/ResetLink";
import moment from "moment";
import { useStyles } from "./PostSearchResults.styles";

interface PostSearchResultsProps {
	dataPosts: {
		posts: PostType[];
		total: number;
	};
}

const PostSearchResults: FC<PostSearchResultsProps> = ({ dataPosts }) => {
	const styles = useStyles();

	return (
		<Box className={styles.container}>
			<HiOutlineChatAlt2 fontSize='50px' />
			<Title semantic={TitleVariantEnum.H5}>{dataPosts.total + " post(s) trouvé(s)"}</Title>
			{dataPosts.total > 0 &&
				dataPosts.posts.map((p, k) => (
					<Flex
						className={styles.postContainer}
						key={k}
						direction={FlexDirectionEnum.Horizontal}
						align={FlexAlignEnum.Center}
					>
						<Title semantic={TitleVariantEnum.H6} className={styles.title}>
							{p.title}
						</Title>
						<Typography className={styles.user}>{p.user.username}</Typography>
						<Typography className={styles.date}>{moment(p.created_at).fromNow()}</Typography>
					</Flex>
				))}
			{/* <Paginate /> */}
		</Box>
	);
};

export default PostSearchResults;
