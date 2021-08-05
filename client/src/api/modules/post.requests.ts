import { AxiosInstance } from "axios";
import { ApiResult, ApiListDataResult, Search, SingleDataResponse } from "api/types/api";
import { Post, PostCreate, PostUpdate } from "api/types/post";

class PostRequest {
	instance: AxiosInstance;

	constructor(instance: AxiosInstance) {
		this.instance = instance;
	}

	async get(id: number): Promise<SingleDataResponse<Post>> {
		return this.instance.get(`/post/${id}`);
	}

	async feed(search: Search): Promise<ApiListDataResult<Post>> {
		return this.instance.get("/posts/feed", { params: search });
	}

	async search(search: Search): Promise<ApiListDataResult<Post>> {
		return this.instance.get("/posts/search", { params: search });
	}

	async createSingleImage(post: PostCreate): Promise<ApiResult> {
		return this.instance.post("/posts/image", post);
	}

	async createVideo(post: PostCreate): Promise<ApiResult> {
		return this.instance.post("/posts/video", post);
	}

	async createMultipleImage(post: PostCreate): Promise<ApiResult> {
		return this.instance.post("/posts/multipleImage", post);
	}

	async update(post: PostUpdate): Promise<ApiResult> {
		return this.instance.put(`/post/${post.id}`, post);
	}

	async delete(id: number): Promise<ApiResult> {
		return this.instance.delete(`/post/${id}`);
	}
}

export default PostRequest;
