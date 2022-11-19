import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/guide-selection/";

class GuideSelectionService {
  async getAvailableGuide(id_orders, start_date, end_date) {
    const response = await axios
      .post(API_URL + 'getAvailableGuide', {
        id_orders: id_orders,
        start_date: start_date,
        end_date: end_date
      }, { headers: authHeader() });
    return response.data;
  }

  async getAllAssigned(id_orders) {
    const response = await axios
      .post(API_URL + 'getAllAssigned', {
        curid: id_orders,
      }, { headers: authHeader() });
    return response.data;
  }

  async getChosenGuide(id_orders) {
    const response = await axios
      .post(API_URL + 'getChosenGuide', {
        curid: id_orders,
      }, { headers: authHeader() });
    return response.data;
  }

  getAllByIdAgent() {
    return axios.get(API_URL + "getAllByIdAgent", { headers: authHeader() });
  }

  getAllByIdGuide() {
    return axios.get(API_URL + "getAllByIdGuide", { headers: authHeader() });
  }

  async store(id_orders, slt_guide_end, start_date, end_date) {
    const response = await axios
      .post(API_URL + 'store', {
        id_orders: id_orders,
        slt_guide: slt_guide_end,
        start_date: start_date,
        end_date: end_date,
      }, { headers: authHeader() });
    return response.data;
  }

  async verifyByAgent(id, approval) {
    const response = await axios
      .post(API_URL + 'verifyByAgent', {
        id_guide_selections: id,
        approval: approval
      }, { headers: authHeader() });
    return response.data;
  }

  async verifyByGuide(id, approval) {
    const response = await axios
      .post(API_URL + 'verifyByGuide', {
        id_guide_selections: id,
        approval: approval
      }, { headers: authHeader() });
    return response.data;
  }
}

export default new GuideSelectionService();
