class Auth {
	isAuthenticated() {
		return true;
	}

	isUnauthenticated() {
		return false;
	}

	isAdmin() {
		return true;
	}
}

export default new Auth();
