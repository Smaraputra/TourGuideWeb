import axios from 'axios';
import authHeader from './auth-header';
import apiUrl from "./api-url";
import fileHeader from './file-header';

const API_URL = apiUrl() + 'guide/';

class TourGuideService {
  getAll() {
    return axios.get(API_URL + "indexTour", { headers: authHeader() });
  }
  getTopThree() {
    return axios.get(API_URL + "top", { headers: authHeader() });
  }
  getProfile() {
    return axios.get(API_URL + 'getProfile', { headers: authHeader() });
  }
  archiveAccount() {
    return axios.get(API_URL + "archiveAccount", { headers: authHeader() });
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
        fee_out: guide.fee_out,
      },
      { headers: authHeader() }
    );
  }

  async update(guide, file) {
    const response = await axios
      .post(API_URL + 'update', {
        description: guide.description,
        fee_out: guide.fee_out,
        photo: file
      }, { headers: fileHeader() });
    return response.data;
  }
}

export default new TourGuideService();
