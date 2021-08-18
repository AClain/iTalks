import { AxiosInstance } from "axios";
import { ApiListDataResult, Search } from "api/types/api";
import { Comment } from "api/types/comment";

class CommentRequest {
	instance: AxiosInstance;

	constructor(instance: AxiosInstance) {
		this.instance = instance;
	}

	async all(postId: number, options: Search): Promise<ApiListDataResult<Comment>> {
		return this.instance.get(`/post/${postId}/comments`, { params: options });
	}

	async send(postId: number, message: string): Promise<ApiListDataResult<Comment>> {
		return this.instance.post(`/comment/${postId}`, { text: message });
	}
}

export default CommentRequest;
