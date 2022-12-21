import axios from "axios";
import authHeader from "./auth-header";
import fileHeader from "./file-header";

const API_URL = "http://localhost:8000/api/package-detail/";

class TourPackageDetailService {
  async store(detail,image_package_detail,id) {
    const response = await axios
      .post(API_URL + 'store', {
        id_tour_packages: id,
        id_tourist_destinations: detail.id_tourist_destinations,
        day: detail.day,
        tour_sequence: detail.tour_sequence,
        duration: detail.duration,
        image_package_detail:image_package_detail
      }, { headers: fileHeader() });
    return response.data;
  }
  async update(detail,id,packid,image_package_detail) {
    const response = await axios
      .post(API_URL + 'update', {
        curid: id,
        curid_packages: packid,
        id_tourist_destinations: detail.id_tourist_destinations,
        day: detail.day,
        tour_sequence: detail.tour_sequence,
        duration: detail.duration,
        image_package_detail:image_package_detail
      }, { headers: fileHeader() });
    return response.data;
  }
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
  async getAllById(id) {
    const response = await axios.post(
      API_URL + "getAllById",
      {
        curid: id,
      },
      { headers: authHeader() }
    );
    return response.data;
  }
  async delete(id,packid) {
    const response = await axios
      .post(API_URL + 'delete', {
        curid: id,
        curid_packages: packid
      }, { headers: authHeader() });
    return response.data;
  }
}

export default new TourPackageDetailService();
