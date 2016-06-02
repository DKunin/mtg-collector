import { QUERY_SET, QUERY_CLEAR } from '../actions/search';

export default function search(state = '', action) {
    switch (action.type) {

        case QUERY_SET:
            return action.text;

        case QUERY_CLEAR:
            return '';

        // case CARDS_LOADED:
        //     return { ...state, cards: action.cards };

        default:
            return state;
    }
}
