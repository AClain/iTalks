import axios, { AxiosInstance } from "axios";
import UserRequest from "api/modules/user.request";
import PostRequest from "api/modules/post.requests";
import CategoryRequest from "api/modules/category.request";
import auth from "api/auth";

class Api {
	public url: string;
	private instance: AxiosInstance;

	public user: UserRequest;
	public post: PostRequest;
	public category: CategoryRequest;

	constructor() {
		this.url = auth.base_url;
		this.instance = axios.create({
			baseURL: this.url,
			headers: {
				Authorization: `Basic ${auth.token}`,
			},
			withCredentials: true,
		});
		this.user = new UserRequest(this.instance);
		this.post = new PostRequest(this.instance);
		this.category = new CategoryRequest(this.instance);
	}
}

const api = new Api();

export { api };
