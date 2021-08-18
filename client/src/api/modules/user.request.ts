import { AxiosInstance } from "axios";
import { ApiResult, ApiListDataResult, Search, SingleDataResponse } from "api/types/api";
import { UserCreate, UserLogin, UserProfil, UserShort, UserUpdate } from "api/types/user";

class UserRequest {
	instance: AxiosInstance;

	constructor(instance: AxiosInstance) {
		this.instance = instance;
	}

	async login(user: UserLogin): Promise<ApiResult> {
		return this.instance.post("/login", user);
	}

	async register(user: UserCreate): Promise<ApiResult> {
		return this.instance.post("/register", user);
	}

	async logout(): Promise<ApiResult> {
		return this.instance.get("/logout");
	}

	async get(id: number): Promise<SingleDataResponse<UserProfil>> {
		return this.instance.get(`/profil/${id}`);
	}

	async profil(): Promise<SingleDataResponse<UserProfil>> {
		return this.instance.get(`/profil/`);
	}

	async search(search: Search): Promise<ApiListDataResult<UserShort>> {
		return this.instance.post("/users/search", search);
	}

	async update(user: UserUpdate): Promise<ApiResult> {
		return this.instance.put("/users", user);
	}

	async delete(id: number): Promise<ApiResult> {
		return this.instance.delete(`/user/${id}`);
	}
}

export default UserRequest;
