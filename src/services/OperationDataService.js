// Operation Data Service

import http from '../http-common'
import authHeader from "@/services/auth-header";

class OperationDataService {
    getOperationsByClientId(clientId) {
        return http.get(`api/clients/${clientId}/operations/`, {
            header: authHeader()} );
    }

    getOperationByClientId(clientId, operationId) {
        return http.get(`api/clients/${clientId}/operations/${operationId}/`, {
            header: authHeader()} );
    }

    saveOperation(data, clientId) {
        return http.post(`api/clients/${clientId}/operations/`, data);
    }

    saveProductOnOperation(operationId, productId, data) {
        return http.post(`api/operations/${operationId}/products/${productId}/`, data);
    }

    getProductsByOperationId(operationId) {
        return http.get(`api/operations/${operationId}/operations-products/`);
    }
}
export default new OperationDataService();
