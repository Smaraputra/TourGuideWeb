import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/tourist-destination/';

class TourDestinationService {
  getAll() {
    return axios.get(API_URL + 'index', { headers: authHeader() });
  }
  async store(destination) {
    const response = await axios
      .post(API_URL + 'store', {
        name: destination.name,
        description: destination.description,
        address: destination.address,
        latitude: destination.latitude,
        longitude: destination.longitude,
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
  async searchFilter(searchname) {
    const response = await axios
      .post(API_URL + 'searchFilter', {
        searchname: searchname,
      }, { headers: authHeader() });
    return response.data;
  }
}

export default new TourDestinationService();
