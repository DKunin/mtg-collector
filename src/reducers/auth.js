import { AUTH_LOADING, AUTH_LOADED } from '../actions/cards';

export default function auth(state = {}, action) {
    switch (action.type) {

        case AUTH_LOADING:
            return [];

        case AUTH_LOADED:
            return action.user;

        default:
            return state;
    }
}
