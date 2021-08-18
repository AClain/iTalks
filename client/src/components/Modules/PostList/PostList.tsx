import { FC, useState, useEffect, ChangeEvent, useRef } from "react";
import { Box, Typography } from "@material-ui/core";
import { Post as PostType } from "api/types/post";
import PostShort from "components/Submodules/PostShort/PostShort";
import { useStyles } from "./PostList.styles";
import { AxiosError, AxiosResponse } from "axios";
import Paginate from "components/Submodules/Paginate/Paginate";
import Loading from "components/Elements/Animations/Loading/Loading";
import { FlexAlignEnum, FlexDirectionEnum, FlexJustifyEnum } from "components/Elements/Layout/Flex/Flex.d";
import Flex from "components/Elements/Layout/Flex/Flex";
import Title from "components/Elements/Typograhpy/Title/Title";
import { TitleVariantEnum } from "components/Elements/Typograhpy/Title/Title.d";

interface PostListProps {
	fetchPosts: Function;
	reload?: boolean;
}

const PostList: FC<PostListProps> = ({ fetchPosts, reload }) => {
	// Styles
	const styles = useStyles();
	// Refs
	const topRef = useRef<HTMLDivElement>(null);
	// States
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState<PostType[]>([]);
	const [total, setTotal] = useState(0);
	const [options, setOptions] = useState<{ page: number; limit: number }>({
		page: 1,
		limit: 15,
	});
	// Custom methods
	const changePage = (event: ChangeEvent<unknown>, value: number) => {
		if (topRef.current) {
			topRef.current.scrollIntoView();
		}
		setOptions({ ...options, page: value });
	};
	// Effects
	useEffect(() => {
		setLoading(true);

		fetchPosts(options)
			.then((res: AxiosResponse) => {
				console.log(res);
				setPosts(res.data.items);
				setTotal(res.data.total);
			})
			.catch((err: AxiosError) => console.error(err))
			.finally(() => {
				setLoading(false);
			});

		return () => {};
	}, [options, reload]);

	return (
		<Box className={styles.list}>
			<div ref={topRef} />
			<Paginate page={options.page} limit={options.limit} total={total} action={changePage} />
			{loading ? (
				<Flex direction={FlexDirectionEnum.Horizontal} justify={FlexJustifyEnum.Center}>
					<Loading radius={15} />
				</Flex>
			) : (
				<>
					{posts.length > 0 ? (
						<>
							{posts.map((p, k) => (
								<PostShort post={p} key={k} />
							))}
							<Paginate page={options.page} limit={options.limit} total={total} action={changePage} />
						</>
					) : (
						<Flex
							direction={FlexDirectionEnum.Vertical}
							justify={FlexJustifyEnum.Center}
							align={FlexAlignEnum.Center}
							height='100%'
						>
							<Title semantic={TitleVariantEnum.H6}>Aucun post récent.</Title>
							<Typography>Commencez à suivre un utilisateur ou une catégorie.</Typography>
						</Flex>
					)}
				</>
			)}
		</Box>
	);
};

export default PostList;
