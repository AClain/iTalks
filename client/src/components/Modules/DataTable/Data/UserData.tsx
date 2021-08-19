import { Header, Property, Action } from "api/types/shared";
import { User, UserCreate } from "api/types/user";
import { HiOutlineTrash, HiUserAdd } from "react-icons/hi";

class UserData {
	[x: string]: any;

	create(user: UserCreate) {}
	update(user: User) {}
	delete(user: User) {}

	headers: Header[] = [
		{ value: "Nom d'utilisateur" },
		{ value: "Email" },
		{ value: "Date de création" },
		{ value: "Nom d'utilisateur" },
		{ value: "Actions", align: "center" },
	];

	properties: Property[] = [{ value: "username" }, { value: "email" }, { value: "created_at" }, { value: "username" }];

	actions: Action[] = [
		{ element: <HiUserAdd />, action: this.update },
		{ element: <HiOutlineTrash />, action: this.delete },
	];
}

export default new UserData();
