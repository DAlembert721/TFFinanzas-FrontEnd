import http from '../http-common';

import jwtDecode from 'jwt-decode'

class AccountDataService {
    login(data) {
        return http.post('api/login/', data).then( response => {
            if (response.data.access) {
                this.decodedToken = jwtDecode(response.data.access)
                //console.log(this.decodedToken)
                localStorage.setItem('token', response.data.access)
                localStorage.setItem('user', JSON.stringify(response.data))
                localStorage.setItem('refresh', response.data.refresh)
                localStorage.setItem('id', this.decodedToken.user_id)
            }
            return response;
        });
    }

    register(data) {
        return http.post("api/accounts/", data);
    }

    logout() {
        localStorage.clear();
    }

    getAccountById(id) {
        return http.get(`api/accounts/${id}/`, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
    }

    updateAccountById(id, data, password) {
        let account
        if (password != null) {
            account = {
                email: data.email,
                address: data.address,
                organization: data.organization,
                phone: data.phone,
                password: password
            }
        }
        else
            account = data
        return http.patch(`api/accounts/${id}/`, account, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
    }
}

export default new AccountDataService();
