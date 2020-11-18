import http from '../http-common';

class ProductDataService {
    getProductsByAccountId(id) {
        return http.get(`api/accounts/${id}/products/`, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
    }

    saveProduct(id, data) {
        return http.post(`api/accounts/${id}/products/`, data);
    }

    editProduct(accountId, data) {
        return http.put(`api/accounts/${accountId}/products/${data.id}/`, data);
    }

    deleteProduct(accountId, productId) {
        return http.delete(`api/accounts/${accountId}/products/${productId}/`);
    }
}

export default new ProductDataService();