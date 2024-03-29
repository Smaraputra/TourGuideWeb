import axios from "axios";
import authHeader from "./auth-header";
import fileHeader from "./file-header";
import apiUrl from "./api-url";

const API_URL = apiUrl() + 'transaction/';

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
  async getDetailJobGuide(id) {
    const response = await axios
      .post(API_URL + 'getDetailJobGuide', {
        curid: id
      }, { headers: authHeader() });
    return response.data;
  }
  async getDetailJobAgent(id) {
    const response = await axios
      .post(API_URL + 'getDetailJobAgent', {
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
  async store(order, addFee, total, end_date) {
    const response = await axios.post(
      API_URL + "store",
      {
        id_package_prices: order.id_package_prices,
        note: order.note,
        order_date: order.order_date,
        end_date: end_date,
        additional_fee: addFee,
        total_price: total,
        id_payment_method_details: order.id_payment_method_details,
        location: order.location,
        latitude: order.latitude,
        longitude: order.longitude
      },
      { headers: authHeader() }
    );
    return response.data;
  }

  async storeByAgent(id_orders, agent_note) {
    const response = await axios.post(
      API_URL + "storeByAgent",
      {
        id_orders: id_orders,
        agent_note: agent_note,
      },
      { headers: authHeader() }
    );
    return response.data;
  }

  async uploadPayment(payment,id) {
    const response = await axios.post(
      API_URL + "uploadPayment",
      {
        payment_proof: payment,
        id_orders: id,
      },
      { headers: fileHeader() }
    );
    return response.data;
  }

  async approvalAgent(conditions,id) {
    const response = await axios.post(
      API_URL + "approvalAgent",
      {
        condition: conditions,
        id_orders: id,
      },
      { headers: authHeader() }
    );
    return response.data;
  }

  async cancelOrderByAgent(id) {
    const response = await axios.post(
      API_URL + "cancelOrderByAgent",
      {
        id_orders: id,
      },
      { headers: authHeader() }
    );
    return response.data;
  }

  async cancelOrderByCustomer(id) {
    const response = await axios.post(
      API_URL + "cancelOrderByCustomer",
      {
        id_orders: id,
      },
      { headers: authHeader() }
    );
    return response.data;
  }

  async finishTour(id) {
    const response = await axios.post(
      API_URL + "finishTour",
      {
        id_orders: id,
      },
      { headers: authHeader() }
    );
    return response.data;
  }

  async searchFilterAgent(order_status) {
    const response = await axios
      .post(API_URL + 'searchFilterAgent', {
        order_status: order_status,
      }, { headers: authHeader() });
    return response.data;
  }

  async searchFilterUser(order_status) {
    const response = await axios
      .post(API_URL + 'searchFilterUser', {
        order_status: order_status,
      }, { headers: authHeader() });
    return response.data;
  }

  async saveRating(tour_rating, id_orders) {
    const response = await axios
      .post(API_URL + 'saveRating', {
        tour_rating: tour_rating,
        id_orders: id_orders,
      }, { headers: authHeader() });
    return response.data;
  }

  async saveGuideRating(guide_rating, id_orders, id_guide_selections, id_guides) {
    const response = await axios
      .post(API_URL + 'saveGuideRating', {
        guide_rating: guide_rating,
        id_orders: id_orders,
        id_guide_selections: id_guide_selections,
        id_guides: id_guides,
      }, { headers: authHeader() });
    return response.data;
  }
}

export default new TourOrderService();
