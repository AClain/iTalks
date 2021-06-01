import axios from "axios";

class AdminStatusRequest {
	#base_url = process.env.REACT_APP_SERVER_URL + "/api/admin";

	getAllStatuses() {
		return new Promise((resolve, reject) => {
			axios
				.get(this.#base_url + "/statuses", {
					withCredentials: true,
				})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	create(statusData) {
		return new Promise((resolve, reject) => {
			axios({
				method: "post",
				url: this.#base_url + "/statuses",
				data: statusData,
				headers: {
					"Content-Type": "multipart/form-data",
				},
				withCredentials: true,
			})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	update(id, statusData) {
		return new Promise((resolve, reject) => {
			axios({
				method: "post",
				url: this.#base_url + "/status/" + id,
				data: statusData,
				withCredentials: true,
			})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	delete(id) {
		return new Promise((resolve, reject) => {
			axios
				.delete(this.#base_url + "/status/" + id, {
					withCredentials: true,
				})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}
}

export default new AdminStatusRequest();
