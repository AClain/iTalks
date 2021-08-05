import { UserShort } from "./user";

declare type Comment = {
	id: number;
	text: string;
	is_edited: boolean;
	created_at: string;
	updated_at: string;
	status: string;
	user: UserShort;
	vote_count: number;
};

export { Comment };
