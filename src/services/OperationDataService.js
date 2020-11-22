// Operation Data Service

import http from '../http-common'
import authHeader from "@/services/auth-header";

class OperationDataService {
    getOperationsByClientId(clientId) {
        return http.get(`clients/${clientId}/operations/`, {
            header: authHeader()} );
    }

    saveOperation(data, clientId) {
        return http.post(`clients/${clientId}/operations/`, data);
    }

    saveProductOnOperation(operationId, productId, data) {
        return http.post(`operations/${operationId}/products/${productId}/`, data);
    }
}
export default new OperationDataService();
