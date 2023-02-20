import axios from 'axios';
import authHeader from './auth-header';
import fileHeader from './file-header';
import apiUrl from "./api-url";

const API_URL = apiUrl() + 'tourist-destination/';

class TourDestinationService {
  getAll() {
    return axios.get(API_URL + 'index', { headers: authHeader() });
  }
  async store(destination, image_tourist_destination) {
    const response = await axios
      .post(API_URL + 'store', {
        name: destination.name,
        description: destination.description,
        address: destination.address,
        latitude: destination.latitude,
        longitude: destination.longitude,
        image_tourist_destination: image_tourist_destination
      }, { headers: fileHeader() });
    return response.data;
  }
  async getOneById(curid) {
    const response = await axios
      .post(API_URL + 'getOneById', {
        curid: curid,
      }, { headers: authHeader() });
    return response.data;
  }
  async update(destination, image_tourist_destination, curid) {
    const response = await axios
      .post(API_URL + 'update', {
        curid: curid,
        name: destination.name,
        description: destination.description,
        address: destination.address,
        latitude: destination.latitude,
        longitude: destination.longitude,
        image_tourist_destination: image_tourist_destination
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
  async searchFilter(searchname) {
    const response = await axios
      .post(API_URL + 'searchFilter', {
        searchname: searchname,
      }, { headers: authHeader() });
    return response.data;
  }
}

export default new TourDestinationService();
