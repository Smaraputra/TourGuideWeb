import axios from 'axios';
import authHeader from './auth-header';
import fileHeader from './file-header';
import apiUrl from "./api-url";

const API_URL = apiUrl() + 'tour-agent/';

class TourAgentService {
  getAll() {
    return axios.get(API_URL + 'index', { headers: authHeader() });
  }
  archiveAccount() {
    return axios.get(API_URL + 'archiveAccount', { headers: authHeader() });
  }
  checkTourAgent() {
    return axios.get(API_URL + 'check', { headers: authHeader() });
  }
  getProfile() {
    return axios.get(API_URL + 'getProfile', { headers: authHeader() });
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
  async adminDelete(id) {
    const response = await axios
      .post(API_URL + 'admindelete', {
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

  async update(profile, photo) {
    const response = await axios
      .post(API_URL + 'update', {
        agent_name: profile.agent_name,
        email: profile.email,
        description: profile.description,
        phone: profile.phone,
        address: profile.address,
        photo:photo
      }, { headers: fileHeader() });
    return response.data;
  }
}

export default new TourAgentService();
