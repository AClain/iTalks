import { AxiosInstance } from "axios";
import { ApiResult, ListDataResponse, Search, SingleDataResponse } from "api/types/api";
import { User, UserCreate, UserProfil, UserUpdate } from "api/types/user";

class UserRequest {
	instance: AxiosInstance;

	constructor(instance: AxiosInstance) {
		this.instance = instance;
	}

	async get(id: number): Promise<SingleDataResponse<UserProfil>> {
		return this.instance.get(`/profil/${id}`);
	}

	async profil(): Promise<SingleDataResponse<UserProfil>> {
		return this.instance.get(`/profil/`);
	}

	async search(search: Search): Promise<ListDataResponse<User>> {
		return this.instance.post("/users/search", search);
	}

	async create(user: UserCreate): Promise<ApiResult> {
		return this.instance.post("/users", user);
	}

	async update(user: UserUpdate): Promise<ApiResult> {
		return this.instance.put("/users", user);
	}

	async delete(id: number): Promise<ApiResult> {
		return this.instance.delete(`/user/${id}`);
	}
}

export default UserRequest;
