// src/auth/index.js

import { router } from '../index';

// URL and endpoint constants
const API_URL = '/api';
const LOGIN_URL = API_URL + 'sessions/create/';

export default {
    user: {
        authenticated: false
    },

    login(context, creds, redirect) {
        // context.$http.post(LOGIN_URL, creds, (data) => {
        //     // localStorage.setItem('id_token', data.id_token);

        //     this.user.authenticated = true;

        //     // Redirect to a specified route
        //     if (redirect) {
        //         router.go(redirect);
        //     }
        // }).error((err) => {
        //     context.error = err;
        // });
    },

    logout() {
        localStorage.removeItem('id_token');
        this.user.authenticated = false;
    },

    checkAuth() {
        var jwt = localStorage.getItem('id_token');
        if (jwt) {
            this.user.authenticated = true;
        }        else {
            this.user.authenticated = false;
        }
    },

    getAuthHeader() {
        return {
            Authorization: 'Bearer ' + localStorage.getItem('id_token')
        };
    }
};
