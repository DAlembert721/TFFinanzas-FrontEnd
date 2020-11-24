import http from '../http-common';

class ProductDataService {
    getProductsByAccountId(id) {
        return http.get(`api/accounts/${id}/products/`, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
    }

    saveProduct(id, data) {
        return http.post(`api/accounts/${id}/products/`, data, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
    }

    editProduct(accountId, data) {
        return http.put(`api/accounts/${accountId}/products/${data.id}/`, data, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
    }

    deleteProduct(accountId, productId) {
        return http.delete(`api/accounts/${accountId}/products/${productId}/`, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
    }
}

export default new ProductDataService();
