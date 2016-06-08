import { AUTH_LOADING, AUTH_LOADED } from '../actions/auth';

export default function auth(state = { username: '' }, action) {
    switch (action.type) {

        case AUTH_LOADING:
            return [];

        case AUTH_LOADED:
            return { username: action.user.user };

        default:
            return state;
    }
}
