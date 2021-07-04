import { Paper } from "@material-ui/core";
import { Post as PostType } from "api/types/post";
import Post from "components/Submodules/Post/Post";
import { FC } from "react";

export interface PostListProps {
	posts: PostType[];
}

const PostList: FC<PostListProps> = ({ posts }) => {
	return (
		<Paper style={{ background: "var(--bg)", boxShadow: "var(--medium-box-shadow)" }}>
			{posts.map((p, i) => (
				<Post post={p} />
			))}
		</Paper>
	);
};

export default PostList;
