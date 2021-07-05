import axios, { AxiosInstance } from "axios";
import UserRequest from "api/modules/user.request";
import PostRequest from "./modules/post.requests";

class Api {
	public url: string;
	private instance: AxiosInstance;

	public user: UserRequest;
	public post: PostRequest;

	constructor() {
		console.log(process.env.REACT_APP_SERVER_URL);
		this.url = process.env.REACT_APP_SERVER_URL! + "/api";
		this.instance = axios.create({
			baseURL: this.url,
			withCredentials: true,
		});
		this.user = new UserRequest(this.instance);
		this.post = new PostRequest(this.instance);
	}
}

const api = new Api();

export { api };
