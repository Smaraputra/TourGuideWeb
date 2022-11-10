import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/transaction/";

class TourOrderService {
  getByIdAgent() {
    return axios.get(API_URL + "getByIdAgent", { headers: authHeader() });
  }
  async getOneByIdAgent(id) {
    const response = await axios
      .post(API_URL + 'getOneByIdAgent', {
        curid: id
      }, { headers: authHeader() });
    return response.data;
  }
  getByIdUser() {
    return axios.get(API_URL + "getByIdUser", { headers: authHeader() });
  }
  async getOneByIdUser(id) {
    const response = await axios
      .post(API_URL + 'getOneByIdUser', {
        curid: id
      }, { headers: authHeader() });
    return response.data;
  }
  async store(order, addFee, total) {
    const response = await axios.post(
      API_URL + "store",
      {
        id_package_prices: order.id_package_prices,
        note: order.note,
        order_date: order.order_date,
        additional_fee: addFee,
        total_price: total,
        id_payment_methods: order.id_payment_methods,
        location: order.location,
        latitude: order.latitude,
        longitude: order.longitude
      },
      { headers: authHeader() }
    );
    return response.data;
  }
}

export default new TourOrderService();
