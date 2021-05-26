import axios from "axios";

class Auth {
	#base_url = process.env.REACT_APP_SERVER_URL + "/api";

	login(userData) {
		return new Promise((resolve, reject) => {
			axios({
				method: "post",
				url: this.#base_url + "/login/",
				data: userData,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				withCredentialsh: true,
			})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	register(ids) {}

	logout() {}

	isAuthenticated() {
		return new Promise((resolve, reject) => {
			axios
				.get(this.#base_url + "/isAuthenticated")
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}
}

export default new Auth();
