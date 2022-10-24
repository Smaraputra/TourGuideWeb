import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/payment-method/";

class PaymentMethodService {
  getAll() {
    return axios.get(API_URL + 'index', { headers: authHeader() });
  }
  async store(method) {
    const response = await axios
      .post(API_URL + 'store', {
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
