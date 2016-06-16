import { AUTH_LOADING, AUTH_LOADED, AUTH_CREATED } from '../actions/auth';

export default function auth(state = { username: '', newusercreated: false }, action) {
    switch (action.type) {

        case AUTH_LOADING:
            return [];

        case AUTH_LOADED:
            return { username: action.user.user || '' };

        case AUTH_CREATED:
            return { newusercreated: true };

        default:
            return state;
    }
}
