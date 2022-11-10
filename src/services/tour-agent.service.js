import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/tour-agent/';

class TourAgentService {
  getAll() {
    return axios.get(API_URL + 'index', { headers: authHeader() });
  }
  checkTourAgent() {
    return axios.get(API_URL + 'check', { headers: authHeader() });
  }
  getUnverifiedTourAgent() {
    return axios.get(API_URL + 'notverified', { headers: authHeader() });
  }
  getVerifiedTourAgent() {
    return axios.get(API_URL + 'verified', { headers: authHeader() });
  }
  async verify(id, verified) {
    const response = await axios
      .post(API_URL + 'verify', {
        curid: id,
        verified: verified
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
  async getById(id) {
    const response = await axios
      .post(API_URL + 'getById', {
        curid: id
      }, { headers: authHeader() });
    return response.data;
  }
  createProfile(agent,id) {
    return axios.post(API_URL + 'store', {
      agent_name: agent.agent_name,
      description: agent.description,
      users_id: id,
      email: agent.email,
      address: agent.address,
      phone: agent.phone,
    }, { headers: authHeader() });
  }
}

export default new TourAgentService();
