import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/";

class AuthService {
  async login(user) {
    const response = await axios.post(API_URL + "login", {
      email: user.email,
      password: user.password,
    });
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  async logout() {
    const response = await axios.post(
      API_URL + "logout",
      {},
      { headers: authHeader() }
    );
    if (response.data) {
      localStorage.removeItem("user");
    }
    return response.data;
  }

  register(user) {
    return axios.post(API_URL + "register", {
      name: user.name,
      email: user.email,
      id_roles: user.id_roles,
      phone: user.phone,
      password: user.password,
      password_confirmed: user.password_confirmed,
      address: user.address,
    });
  }
}

export default new AuthService();
