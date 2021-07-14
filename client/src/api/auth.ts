import jwt_decode from "jwt-decode";

class Auth {
	base_url: string = process.env.REACT_APP_SERVER_URL + "/api";
	token: string = localStorage.getItem("token")!;

	isAuthenticated() {
		return typeof this.token !== "undefined";
	}

	isUnauthenticated() {
		return typeof this.token === "undefined";
	}

	decodedToken(): any {
		var decoded = jwt_decode(this.token);

		return decoded;
	}

	isAdmin() {
		if (this.isUnauthenticated()) {
			return false;
		}

		if (this.decodedToken().role !== "admin") return false;
		return true;
	}
}

export default new Auth();
