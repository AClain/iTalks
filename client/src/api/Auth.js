import axios from "axios";

class Auth {
  #base_url = "http://localhost:8000/api";

  login(ids) {
    localStorage.setItem("isAuthenticated", true);
  }

  register(ids) {
    localStorage.setItem("isAuthenticated", true);
  }

  logout() {
    localStorage.setItem("isAuthenticated", false);
  }

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
