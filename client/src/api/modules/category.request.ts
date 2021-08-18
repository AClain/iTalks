import { AxiosInstance } from "axios";
import { ApiArrayDataResult, ApiListDataResult, SingleDataResponse } from "api/types/api";
import { Category } from "api/types/category";
import { Post } from "api/types/post";

class PostRequest {
	instance: AxiosInstance;

	constructor(instance: AxiosInstance) {
		this.instance = instance;
	}

	async all(): Promise<ApiArrayDataResult<Category>> {
		return this.instance.get("/categories");
	}

	async get(id: number): Promise<SingleDataResponse<Post>> {
		return this.instance.get(`/category/${id}`);
	}
}

export default PostRequest;
