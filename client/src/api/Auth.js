import axios from "axios";
import Cookies from "js-cookie";
class Auth {
	#base_url = process.env.REACT_APP_SERVER_URL + "/api";
	#token = Cookies.get("token");

	login(userData) {
		return new Promise((resolve, reject) => {
			axios
				.post(this.#base_url + "/login/", userData, {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					withCredentials: true,
				})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	// register(ids) {}

	// logout() {}

	isAuthenticated() {
		console.log(this.#token);

		if (!this.#token) {
			return false;
		}

		return true;
	}

	isUnauthenticated() {
		console.log(this.#token);

		if (this.#token) {
			return false;
		}

		return true;
	}
}

export default new Auth();
