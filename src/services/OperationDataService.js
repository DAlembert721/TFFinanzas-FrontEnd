// Operation Data Service

import http from '../http-common'
import authHeader from "@/services/auth-header";

class OperationDataService {
    getOperationsByClientId(clientId) {
        return http.get(`clients/${clientId}/operations/`, {
            header: authHeader()} );
    }
}
export default new OperationDataService();
