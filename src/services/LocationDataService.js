// Location Data Service
import http from "../http-common"

class LocationDataService {
    getRegions() {
        return http.get("api/regions/");
    }
    getProvinces(regionId) {
        return http.get(`api/regions/${regionId}/provinces/`);
    }
    getDistricts(provinceId) {
        return http.get(`api/provinces/${provinceId}/districts/`);
    }
}
export default new LocationDataService();
