import PropTypes from "prop-types";

import { Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

import Post from "../../../Misc/Posts/Post";

const PostListTab = ({ posts }) => {
	return (
		<Flex>
			{posts.length > 0 ? posts.map((p, i) => <Post post={p} key={i} />) : <Text fontStyle='italic'>Aucun post</Text>}
		</Flex>
	);
};

PostListTab.propTypes = {
	posts: PropTypes.array.isRequired,
};

export default PostListTab;
