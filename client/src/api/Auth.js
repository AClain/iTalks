import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

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

	register(userData) {
		return new Promise((resolve, reject) => {
			axios
				.post(this.#base_url + "/register/", userData, {
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

	// logout() {}

	isAuthenticated() {
		if (!this.#token) {
			return false;
		}

		return true;
	}

	isUnauthenticated() {
		if (this.#token) {
			return false;
		}

		return true;
	}

	decodeToken() {
		var decoded = jwt_decode(this.#token);

		return decoded;
	}

	isAdmin() {
		if (this.decodeToken().role !== "admin") return false;
		return true;
	}
}

export default new Auth();
