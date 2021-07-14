import { Resource } from "./resource";
import { UserShort } from "./user";

declare type Post = {
	id: number;
	title: string;
	text: string;
	is_edited: boolean;
	created_at: string;
	updated_at: string;
	status: string;
	user: UserShort;
	vote_count: number;
	comment_count: number;
	assiociated_resources?: Resource[];
};

declare type PostCreate = {
	title: string;
	text?: string;
	assiociated_resources?: File[];
};

declare type PostUpdate = {
	id: number;
	title: string;
	text?: string;
	status?: string;
	assiociated_resources?: File[];
};

export { Post, PostCreate, PostUpdate };
