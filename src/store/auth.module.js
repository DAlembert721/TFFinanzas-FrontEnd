// auth.module.js

// Vuex Authentication Module

import AccountDataService from "@/services/AccountDataService";

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user?
    {status: {loggedIn: true}, user}
    : {status: {loggedIn: false}, user: null};

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({commit}, user) {
            console.log('here')
            return AccountDataService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                });
        },
        logout({commit}) {
            AccountDataService.logout();
            commit('logout');
        },
        register({commit}, data) {
            const account = {
                email: data.email,
                password: data.password,
                first_name: data.firstName,
                last_name: data.lastName,
                dni: data.dni,
                phone: data.phone,
                address: data.address,
                organization: data.organization,
                ruc: data.ruc,
            }
            return AccountDataService.register(account)
                .then(response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                }, error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                });
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }
}
