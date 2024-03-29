import axios from "axios";
import authHeader from "./auth-header";
import apiUrl from "./api-url";

const API_URL = apiUrl() + 'payment-method/';

class PaymentMethodService {
  getAll() {
    return axios.get(API_URL + 'index', { headers: authHeader() });
  }
  async getOneById(id) {
    const response = await axios
      .post(API_URL + 'getOneById', {
        curid: id
      }, { headers: authHeader() });
    return response.data;
  }
  async store(method) {
    const response = await axios
      .post(API_URL + 'store', {
        method: method.method,
        description: method.description,
      }, { headers: authHeader() });
    return response.data;
  }

  async update(method, curid) {
    const response = await axios
      .post(API_URL + 'update', {
        curid: curid,
        method: method.method,
        description: method.description,
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

export default new PaymentMethodService();
