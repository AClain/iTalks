import { Badge } from "api/types/badge";
import { Header, Property, Action } from "api/types/shared";
import { HiOutlineTrash, HiUserAdd } from "react-icons/hi";

class BadgeData {
	[x: string]: any;

	create(badge: Badge) {}
	update(badge: Badge) {}
	delete(badge: Badge) {}

	headers: Header[] = [
		{ value: "Name" },
		{ value: "Image" },
		{ value: "Statut" },
		{ value: "Date de création" },
		{ value: "Actions", align: "center" },
	];

	properties: Property[] = [{ value: "name" }, { value: "resource" }, { value: "status" }, { value: "created_at" }];

	actions: Action[] = [
		{ element: <HiUserAdd />, action: this.update },
		{ element: <HiOutlineTrash />, action: this.delete },
	];
}

export default new BadgeData();
