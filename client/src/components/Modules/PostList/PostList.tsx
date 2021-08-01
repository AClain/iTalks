import { Paper } from "@material-ui/core";
import { Post as PostType } from "api/types/post";
import Post from "components/Submodules/Post/Post";
import { FC } from "react";
import { useStyles } from "./PostList.styles";

export interface PostListProps {
	posts: PostType[];
}

const PostList: FC<PostListProps> = ({ posts }) => {
	const styles = useStyles();

	return (
		<Paper className={styles.list}>
			{posts.map((p, i) => (
				<Post post={p} key={i} />
			))}
		</Paper>
	);
};

export default PostList;
