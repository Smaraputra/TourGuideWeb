import axios from "axios";
import authHeader from "./auth-header";
import apiUrl from "./api-url";

const API_URL = apiUrl() + 'package-facility/';

class TourFacilitiesService {
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
  async store(fac,packid,detid) {
    const response = await axios
      .post(API_URL + 'store', {
        curid_packages: packid,
        id_package_details: detid,
        facilities: fac.facilities,
        description_agent: fac.description_agent,
        description_public: fac.description_public,
      }, { headers: authHeader() });
    return response.data;
  }
  async update(fac,packid,detid,id) {
    const response = await axios
      .post(API_URL + 'update', {
        curid_packages: packid,
        curid_detail: detid,
        curid: id,
        facilities: fac.facilities,
        description_agent: fac.description_agent,
        description_public: fac.description_public,
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

export default new TourFacilitiesService();
