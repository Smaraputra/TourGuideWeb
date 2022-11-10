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
  getIndexTour() {
    return axios.get(API_URL + "indexTour", { headers: authHeader() });
  }
  async store(packages) {
    const response = await axios
      .post(API_URL + 'store', {
        id_package_categories: packages.id_package_categories,
        package_name: packages.package_name,
        description: packages.description,
        terms: packages.terms,
      }, { headers: authHeader() });
    return response.data;
  }
  async getById(id) {
    const response = await axios.post(
      API_URL + "getById",
      {
        curid: id,
      },
      { headers: authHeader() }
    );
    return response.data;
  }
  async getByIdDetail(id) {
    const response = await axios.post(
      API_URL + "getByIdDetail",
      {
        curid: id,
      },
      { headers: authHeader() }
    );
    return response.data;
  }
  async getByAllId(id) {
    const response = await axios.post(
      API_URL + "getAllById",
      {
        curid: id,
      },
      { headers: authHeader() }
    );
    return response.data;
  }
  async update(packages,id) {
    const response = await axios
      .post(API_URL + 'update', {
        curid: id,
        id_package_categories: packages.id_package_categories,
        package_name: packages.package_name,
        description: packages.description,
        terms: packages.terms,
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

export default new TourPackageService();
