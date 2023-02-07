import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/pickup-fee/";

class PickupFeeService {
  getAll() {
    return axios.get(API_URL + 'index', { headers: authHeader() });
  }
  getById() {
    return axios.get(API_URL + 'getById', { headers: authHeader() });
  }
  async getOneById(id) {
    const response = await axios
      .post(API_URL + 'getOneById', {
        curid: id
      }, { headers: authHeader() });
    return response.data;
  }
  async store(pickupfee) {
    const response = await axios
      .post(API_URL + 'store', {
        distance: pickupfee.distance,
        fee: pickupfee.fee,
      }, { headers: authHeader() });
    return response.data;
  }
  async update(pickupfee, curid) {
    const response = await axios
      .post(API_URL + 'update', {
        curid: curid,
        distance: pickupfee.distance,
        fee: pickupfee.fee,
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

export default new PickupFeeService();
