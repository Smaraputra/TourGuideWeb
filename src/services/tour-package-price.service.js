import axios from "axios";
import authHeader from "./auth-header";
import apiUrl from "./api-url";

const API_URL = apiUrl() + 'package-price/';

class TourPackagePriceService {
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
  async store(price,id) {
    const response = await axios
      .post(API_URL + 'store', {
        id_tour_packages: id,
        pax_total: price.pax_total,
        transportation: price.transportation,
        pickup_location: price.pickup_location,
        latitude: price.latitude,
        longitude: price.longitude,
        pickup_time: price.pickup_time,
        price: price.price,
      }, { headers: authHeader() });
    return response.data;
  }
  async update(price,packid,id) {
    const response = await axios
      .post(API_URL + 'update', {
        curid_package: packid,
        curid: id,
        id_tour_packages: packid,
        pax_total: price.pax_total,
        transportation: price.transportation,
        pickup_location: price.pickup_location,
        latitude: price.latitude,
        longitude: price.longitude,
        pickup_time: price.pickup_time,
        price: price.price,
      }, { headers: authHeader() });
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

export default new TourPackagePriceService();
