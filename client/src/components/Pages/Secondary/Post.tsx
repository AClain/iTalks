import { Box, Typography } from "@material-ui/core";
import { api } from "api/api.request";
import { Post as PostType } from "api/types/post";
import Loading from "components/Elements/Animations/Loading/Loading";
import Flex from "components/Elements/Layout/Flex/Flex";
import { FlexDirectionEnum } from "components/Elements/Layout/Flex/Flex.d";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";
import CommentSection from "components/Modules/CommentSection/CommentSection";
import { FC, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

interface MatchParams {
	id: string;
}

const Post: FC<{}> = () => {
	let match = useRouteMatch<MatchParams>("/post/:id");

	const [post, setPost] = useState<PostType | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		api.post
			.get(parseInt(match!.params.id))
			.then((res) => {
				console.log(res);
				setPost(res.data);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});

		return () => {};
	}, [match?.params.id]);

	return (
		<Box>
			{loading ? (
				<Flex direction={FlexDirectionEnum.Horizontal}>
					<Loading />
				</Flex>
			) : (
				post && (
					<Flex direction={FlexDirectionEnum.Vertical}>
						<Title semantic={TitleVariantEnum.H3}>{post.title}</Title>
						<Typography style={{ margin: "150px 0px" }}>{post.text}</Typography>

						<Title semantic={TitleVariantEnum.H5}>Commentaires ({post.comment_count})</Title>

						<CommentSection postId={post.id} />
					</Flex>
				)
			)}
		</Box>
	);
};

export default Post;
