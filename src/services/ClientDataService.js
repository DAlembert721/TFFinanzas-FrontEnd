// Client Data Service
import http from '../http-common'
import authHeader from "@/services/auth-header";

class ClientDataService {
    getClients() {
        const accountId = localStorage.getItem('id');
        return http.get(`api/accounts/${accountId}/clients/`, {
            headers: authHeader()});
    }
}

export default new ClientDataService();
