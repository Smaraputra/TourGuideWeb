import axios from "axios";
import authHeader from "./auth-header";
import fileHeader from "./file-header";
import apiUrl from "./api-url";

const API_URL = apiUrl()

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

  async update(user, jwt, photo) {
    const response = await axios
      .post(API_URL + 'updateProfile', {
        name: user.name,
        phone: user.phone,
        address: user.address,
        jwt: jwt,
        photo:photo
      }, { headers: fileHeader() });
    return response.data;
  }

  async changePassword(password) {
    const response = await axios
      .post(API_URL + 'changePassword', {
        newpassword: password.newpassword,
        oldpassword: password.oldpassword,
      }, { headers: fileHeader() });
    return response.data;
  }
}

export default new AuthService();
