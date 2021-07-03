import axios, { AxiosInstance } from "axios";
import UserRequest from "./user.request";

export default class Api {
	public url: string;
	private instance: AxiosInstance;

	public user: UserRequest;

	constructor() {
		this.url = process.env.REACT_APP_SERVER_URL!;
		this.instance = axios.create({
			baseURL: this.url,
			withCredentials: true,
		});
		this.user = new UserRequest(this.instance);
	}
}

const api = new Api();

export { api };
