class Auth {
	isAuthenticated() {
		return false;
	}

	isUnauthenticated() {
		return true;
	}

	isAdmin() {
		return true;
	}
}

export default new Auth();
