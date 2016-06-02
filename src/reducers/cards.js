import { CARDS_LOADING, CARDS_LOADED } from '../actions/cards';

export default function cards(state = [], action) {
    switch (action.type) {

        case CARDS_LOADING:
            return [];

        case CARDS_LOADED:
            return action.cards;

        default:
            return state;
    }
}
