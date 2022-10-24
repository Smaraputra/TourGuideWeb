import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/tour-package/";

class TourPackageService {
  getTopSix() {
    return axios.get(API_URL + "top", { headers: authHeader() });
  }
  getAll() {
    return axios.get(API_URL + "index", { headers: authHeader() });
  }
}

export default new TourPackageService();
