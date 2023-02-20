import axios from "axios";
import authHeader from "./auth-header";
import apiUrl from "./api-url";

const API_URL = apiUrl() + 'dashboard/';

class DashboardService {
  getAgentNotVerified() {
    return axios.get(API_URL + "agent-not-admin", { headers: authHeader() });
  }
  indexGuide() {
    return axios.get(API_URL + "total-guide-admin", { headers: authHeader() });
  }
  indexOrder() {
    return axios.get(API_URL + "total-order-admin", { headers: authHeader() });
  }

  getGuideNotVerified() {
    return axios.get(API_URL + "guide-not-agent", { headers: authHeader() });
  }
  indexTourAgent() {
    return axios.get(API_URL + "total-package-agent", {
      headers: authHeader(),
    });
  }
  getUnverifiedByIdAgent() {
    return axios.get(API_URL + "order-not-agent", { headers: authHeader() });
  }

  getAllByIdGuideChoosen() {
    return axios.get(API_URL + "total-job-taken", { headers: authHeader() });
  }
  getAllByIdGuideWaiting() {
    return axios.get(API_URL + "job-no-taken", { headers: authHeader() });
  }
}

export default new DashboardService();
