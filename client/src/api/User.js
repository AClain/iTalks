import axios from "axios";

class User {
	#base_url = process.env.REACT_APP_SERVER_URL + "/api/";

	profil() {
		return new Promise((resolve, reject) => {
			axios
				.get(this.#base_url + "profil", {
					withCredentials: true,
				})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	profilComments() {
		return new Promise((resolve, reject) => {
			axios
				.get(this.#base_url + "profil/comments", {
					withCredentials: true,
				})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}
}

export default new User();
