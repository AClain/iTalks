import PropTypes from "prop-types";

import { Flex } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react";

const Post = ({ post }) => {
	return (
		<Flex>
			<Heading>{post.title}</Heading>
			<Text>{post.text}</Text>
			<Flex justify='space-between'>
				<Text>{post.created_at}</Text>
				{/* <Text>{post}</Text> */}
			</Flex>
		</Flex>
	);
};

Post.propTypes = {
	post: PropTypes.object.isRequired,
};

export default Post;
