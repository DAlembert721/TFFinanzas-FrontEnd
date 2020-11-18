// Bill Data Service

import http from '../http-common'
import authHeader from "@/services/auth-header";

class BillDataService {
    getBillByClientId(clientId) {
        return http.get(`api/clients/${clientId}/bills/`, {
            headers: authHeader()});
    }
}

export default new BillDataService();
