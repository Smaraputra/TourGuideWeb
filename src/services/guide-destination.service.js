import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/guide-destination/";

class GuideDestinationService {
  indexGuide() {
    return axios.get(API_URL + 'indexGuide', { headers: authHeader() });
  }
  async getOneById(id) {
    const response = await axios
      .post(API_URL + 'getOneById', {
        curid: id
      }, { headers: authHeader() });
    return response.data;
  }
  async store(dest) {
    const response = await axios
      .post(API_URL + 'store', {
        id_tourist_destinations: dest.id_tourist_destinations,
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

export default new GuideDestinationService();
