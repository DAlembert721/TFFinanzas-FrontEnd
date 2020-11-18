import http from '../http-common';

class RateDataService {
    getRates() {
        return http.get('api/rates/');
    }
}

export default new RateDataService();