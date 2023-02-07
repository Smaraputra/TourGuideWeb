import axios from 'axios';
import authHeader from './auth-header';
import fileHeader from './file-header';

const API_URL = 'http://localhost:8000/api/tourist-destination-request/';

class TourDestinationRequestService {
  getAll() {
    return axios.get(API_URL + 'index', { headers: authHeader() });
  }
  getIndexTour() {
    return axios.get(API_URL + 'indexTour', { headers: authHeader() });
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
  async approvalAgent(conditions,id) {
    const response = await axios.post(
      API_URL + "approve",
      {
        condition: conditions,
        id_tourist_destination_requests: id,
      },
      { headers: authHeader() }
    );
    return response.data;
  }
}

export default new TourDestinationRequestService();
