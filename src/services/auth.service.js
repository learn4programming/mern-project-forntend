import axios from "axios";
const API_URL = "https://mern-project-api-bycc.onrender.com/api/user";
// const API_URL = "http://localhost:8080/api/user";

class AuthForService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

const AuthService = new AuthForService();
export default AuthService;
