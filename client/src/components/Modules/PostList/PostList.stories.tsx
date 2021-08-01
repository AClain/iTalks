import { Story } from "@storybook/react";

import PostList, { PostListProps } from "./PostList";

export default {
	component: PostList,
	title: "Modules/PostList",
};

const Template: Story<PostListProps> = (args) => <PostList {...args} />;

export const Default = Template.bind({});
Default.args = {
	posts: [
		{
			assiociated_resources: [],
			created_at: "2021-01-02T23:35:26.000000Z",
			updated_at: "2021-01-02T23:35:26.000000Z",
			is_edited: false,
			comment_count: 531,
			status: "actif",
			id: 9,
			text:
				"Commodo ad laborum nisi Lorem. Mollit deserunt velit anim reprehenderit. In esse velit duis sint. Proident cillum nisi et laborum ad ut exercitation reprehenderit aliqua voluptate.",
			title: "Un super post",
			user: {
				id: 1,
				username: "user45978",
				feedback: null,
			},
			vote_count: 3694,
		},
		{
			assiociated_resources: [
				{
					id: 1,
					link:
						"https://images.unsplash.com/photo-1591488320449-011701bb6704?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
					name: "image.png",
					created_at: "2021-06-28T23:35:26.000000Z",
					updated_at: "2021-06-28T23:35:26.000000Z",
					status: "actif",
				},
			],
			created_at: "2021-06-28T23:35:26.000000Z",
			updated_at: "2021-06-28T23:35:26.000000Z",
			is_edited: false,
			comment_count: 5,
			status: "actif",
			id: 9,
			text:
				"Commodo ad laborum nisi Lorem. Mollit deserunt velit anim reprehenderit. In esse velit duis sint. Proident cillum nisi et laborum ad ut exercitation reprehenderit aliqua voluptate.",
			title: "Un super post",
			user: {
				id: 1,
				username: "user45978",
				feedback: true,
			},
			vote_count: 350,
		},
		{
			assiociated_resources: [],
			created_at: "2021-06-28T23:35:26.000000Z",
			updated_at: "2021-06-28T23:35:26.000000Z",
			is_edited: false,
			comment_count: 34,
			status: "actif",
			id: 9,
			text:
				"Commodo ad laborum nisi Lorem. Mollit deserunt velit anim reprehenderit. In esse velit duis sint. Proident cillum nisi et laborum ad ut exercitation reprehenderit aliqua voluptate.",
			title: "Un super post",
			user: {
				id: 1,
				username: "user45978",
				feedback: false,
			},
			vote_count: 124,
		},
	],
};
