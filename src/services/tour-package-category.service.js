import axios from "axios";
import authHeader from "./auth-header";
import apiUrl from "./api-url";

const API_URL = apiUrl() + 'package-category/';

class TourPackageCategoryService {
  getAll() {
    return axios.get(API_URL + 'index', { headers: authHeader() });
  }
  async store(category) {
    const response = await axios
      .post(API_URL + 'store', {
        category: category.category,
        description: category.description,
        guide_included: category.guide_included,
      }, { headers: authHeader() });
    return response.data;
  }
  async update(category, curid) {
    const response = await axios
      .post(API_URL + 'update', {
        curid: curid,
        category: category.category,
        description: category.description,
        guide_included: category.guide_included,
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
  async getOneById(id) {
    const response = await axios
      .post(API_URL + 'getOneById', {
        curid: id
      }, { headers: authHeader() });
    return response.data;
  }
}

export default new TourPackageCategoryService();
