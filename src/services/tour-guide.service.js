import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/guide/';

class TourGuideService {
  getAll() {
    return axios.get(API_URL + "index", { headers: authHeader() });
  }
  checkTourGuide() {
    return axios.get(API_URL + "check", { headers: authHeader() });
  }
  getUnverifiedTourGuide() {
    return axios.get(API_URL + "notverified", { headers: authHeader() });
  }
  async verify(id, status) {
    const response = await axios.post(
      API_URL + "verify",
      {
        curid: id,
        status: status,
      },
      { headers: authHeader() }
    );
    return response.data;
  }
  async delete(id) {
    const response = await axios.post(
      API_URL + "delete",
      {
        curid: id,
      },
      { headers: authHeader() }
    );
    return response.data;
  }
  createProfile(guide) {
    return axios.post(
      API_URL + "store",
      {
        id_tour_agents: guide.id_tour_agents,
        description: guide.description,
      },
      { headers: authHeader() }
    );
  }
}

export default new TourGuideService();
