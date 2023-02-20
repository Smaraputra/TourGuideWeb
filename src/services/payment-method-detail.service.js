import axios from "axios";
import authHeader from "./auth-header";
import apiUrl from "./api-url";

const API_URL = apiUrl() + 'payment-detail/';

class PaymentMethodDetailService {
  indexTourAgent() {
    return axios.get(API_URL + 'indexTourAgent', { headers: authHeader() });
  }
  async getOneById(id) {
    const response = await axios
      .post(API_URL + 'getOneById', {
        curid: id
      }, { headers: authHeader() });
    return response.data;
  }
  async getAllById(id) {
    const response = await axios
      .post(API_URL + 'getAllById', {
        curid: id
      }, { headers: authHeader() });
    return response.data;
  }
  async store(method) {
    const response = await axios
      .post(API_URL + 'store', {
        id_payment_methods: method.id_payment_methods,
        payment_number: method.payment_number,
        description: method.description,
      }, { headers: authHeader() });
    return response.data;
  }
  async update(method,curid) {
    const response = await axios
      .post(API_URL + 'update', {
        curid: curid,
        id_payment_methods: method.id_payment_methods,
        payment_number: method.payment_number,
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

export default new PaymentMethodDetailService();
