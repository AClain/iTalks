import axios from "axios";
import Cookies from "js-cookie";
import verify from "jose/jwt/verify";
class Auth {
	#base_url = process.env.REACT_APP_SERVER_URL + "/api";
	#token = Cookies.get("token");

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

	// register(ids) {}

	// logout() {}

	async isAuthenticated() {
		console.log(this.#token);

		if (!this.#token) {
			return false;
		}

		const publicKey = process.env.REACT_APP_CLIENT_SECRET;
		const { payload, protectedHeader } = await jwtVerify(this.#token, publicKey, {
			issuer: process.env.REACT_APP_SERVER_URL,
		});

		console.log(payload, protectedHeader);

		return true;
		// return new Promise((resolve, reject) => {
		// 	axios
		// 		.get(this.#base_url + "/isAuthenticated")
		// 		.then((data) => resolve(data))
		// 		.catch((err) => reject(err));
		// });
	}
}

export default new Auth();
