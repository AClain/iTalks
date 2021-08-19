import { Role } from "api/types/role";
import { Header, Property, Action } from "api/types/shared";
import { HiOutlineTrash, HiUserAdd } from "react-icons/hi";

class RoleData {
	[x: string]: any;

	create(role: Role) {}
	update(role: Role) {}
	delete(role: Role) {}

	headers: Header[] = [{ value: "Name" }, { value: "Date de création" }, { value: "Actions", align: "center" }];

	properties: Property[] = [{ value: "name" }, { value: "created_at" }];

	actions: Action[] = [
		{ element: <HiUserAdd />, action: this.update },
		{ element: <HiOutlineTrash />, action: this.delete },
	];
}

export default new RoleData();
