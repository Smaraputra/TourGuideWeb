import axios from "axios";
import authHeader from "./auth-header";
import fileHeader from "./file-header";
import apiUrl from "./api-url";

const API_URL = apiUrl() + 'tour-package/';

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
  async store(packages, cover_image) {
    const response = await axios
      .post(API_URL + 'store', {
        id_package_categories: packages.id_package_categories,
        package_name: packages.package_name,
        description: packages.description,
        terms: packages.terms,
        cover_image: cover_image,
      }, { headers: fileHeader() });
    return response.data;
  }
  async searchFilter(package_name, id_package_categories) {
    const response = await axios
      .post(API_URL + 'searchFilter', {
        id_package_categories: id_package_categories,
        package_name: package_name,
      }, { headers: authHeader() });
    return response.data;
  }
  async copyById(id) {
    const response = await axios.post(
      API_URL + "copyById",
      {
        curid: id,
      },
      { headers: authHeader() }
    );
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
  async update(packages,published,cover_image,id) {
    if(published==false){
      published='No'
    }else{
      published='Yes'
    }
    const response = await axios
      .post(API_URL + 'update', {
        curid: id,
        published: published,
        id_package_categories: packages.id_package_categories,
        package_name: packages.package_name,
        description: packages.description,
        terms: packages.terms,
        cover_image:cover_image
      }, { headers: fileHeader() });
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
