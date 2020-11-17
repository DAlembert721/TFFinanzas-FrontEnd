import http from '../http-common';

const jwtDecode = require('jwt-decode');

class UserDataService {
    login(data) {
        return http.post('api/login', data).then( response => {
            if (response.data.token) {
                this.decodedToken = jwtDecode(response.data.token)
                localStorage.setItem('id', this.decodedToken.user_id)
            }
            return response;
        })
    }

    register(data) {
        return http.post("api/users", data);
    }

    delete(id) {
        return http.delete(`api/users/${id}`);
    }

    logout() {
        localStorage.clear();
    }
}

export default new UserDataService();