import axios from "axios";
import authHeader from "./auth-header";
import apiUrl from "./api-url";

const API_URL = apiUrl() + 'package-activity/';

class TourActivitiesService {
  async getById(id) {
    const response = await axios.post(
      API_URL + "getById",
      {
        curid: id,
      },
      { headers: authHeader() }
    );
    return response.data;
  }
  async getOneById(id) {
    const response = await axios.post(
      API_URL + "getOneById",
      {
        curid: id,
      },
      { headers: authHeader() }
    );
    return response.data;
  }
  async store(act,packid,detid) {
    const response = await axios
      .post(API_URL + 'store', {
        curid_packages: packid,
        id_package_details: detid,
        start_time: act.start_time,
        end_time: act.end_time,
        location: act.location,
        activity: act.activity,
      }, { headers: authHeader() });
    return response.data;
  }
  async update(act,packid,detid,id) {
    const response = await axios
      .post(API_URL + 'update', {
        curid_packages: packid,
        curid_detail: detid,
        curid: id,
        start_time: act.start_time,
        end_time: act.end_time,
        location: act.location,
        activity: act.activity,
      }, { headers: authHeader() });
    return response.data;
  }
  async delete(id,packid,detid) {
    const response = await axios
      .post(API_URL + 'delete', {
        curid: id,
        curid_packages: packid,
        curid_detail: detid
      }, { headers: authHeader() });
    return response.data;
  }
}

export default new TourActivitiesService();
