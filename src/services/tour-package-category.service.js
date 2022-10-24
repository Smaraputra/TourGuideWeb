import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/package-category/";

class TourPackageCategoryService {
  getAll() {
    return axios.get(API_URL + 'index', { headers: authHeader() });
  }
  async store(category) {
    const response = await axios
      .post(API_URL + 'store', {
        category: category.category,
        description: category.description,
      }, { headers: authHeader() });
    return response.data;
  }
  async delete(id) {
    const response = await axios
      .post(API_URL + 'delete', {
        curid: id
      }, { headers: authHeader() });
    return response.data;
  }
}

export default new TourPackageCategoryService();
