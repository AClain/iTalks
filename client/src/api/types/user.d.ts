import { Search } from "./api";
import { Badge } from "./badge";

declare type UserProfil = {
	id: number;
	username: string;
	email: string;
	created_at: Date;
	updated_at: Date;
	role: string;
	avatar: string;
	status: string;
	badges: Badge[];
};

declare type User = {
	id: number;
	username: string;
	created_at: Date;
	updated_at: Date;
	role: string;
	avatar: string;
};

declare type UserSearch = {
	options: Search;
	username?: string;
};

declare type UserCreate = {
	username: string;
	email: string;
	password: string;
	password_confirmation: string;
};

declare type UserUpdate = {
	id: number;
	username: string;
	avatar?: File;
	email: string;
	password: string;
};

declare type UserShort = {
	id: number;
	username: string;
};

export { UserProfil, User, UserSearch, UserCreate, UserUpdate, UserShort };
