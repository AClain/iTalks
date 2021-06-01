import axios from "axios";

class AdminUserRequest {
	#base_url = process.env.REACT_APP_SERVER_URL + "/api/admin";

	getAllUsers() {
		return new Promise((resolve, reject) => {
			axios
				.get(this.#base_url + "/users", {
					withCredentials: true,
				})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	getUserByUsername(username) {
		return new Promise((resolve, reject) => {
			axios
				.get(this.#base_url + "/user/username/" + username, {
					withCredentials: true,
				})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	create(userData) {
		let formData = new FormData();
		Object.entries(userData).forEach((data) => {
			if (data[0] === "avatar") {
				formData.append("avatar", userData.avatar[0]);
			} else {
				formData.append(data[0], data[1]);
			}
		});

		return new Promise((resolve, reject) => {
			axios({
				method: "post",
				url: this.#base_url + "/users",
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
				},
				withCredentials: true,
			})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	update(username, userData) {
		return new Promise((resolve, reject) => {
			axios({
				method: "post",
				url: this.#base_url + "/user/" + username,
				data: userData,
				withCredentials: true,
			})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	updateAvatar(username, inputFile) {
		return new Promise((resolve, reject) => {
			if (inputFile.files) {
				let formData = new FormData();
				formData.append("avatar", inputFile.files[0]);

				axios({
					method: "post",
					url: this.#base_url + "/user/" + username + "/avatar",
					data: formData,
					headers: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				})
					.then((data) => resolve(data))
					.catch((err) => reject(err));

				return true;
			}
			reject();

			return false;
		});
	}

	delete(username) {
		return new Promise((resolve, reject) => {
			axios
				.delete(this.#base_url + "/user/" + username, {
					withCredentials: true,
				})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	deleteAvatar(username) {
		return new Promise((resolve, reject) => {
			axios
				.delete(this.#base_url + "/user/" + username + "/avatar", {
					withCredentials: true,
				})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}
}

export default new AdminUserRequest();