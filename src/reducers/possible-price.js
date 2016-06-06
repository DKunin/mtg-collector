import { PRICE_LOADING, PRICE_LOADED } from '../actions/possible-price';

export default function possiblePrice(state = '', action) {
    switch (action.type) {

        case PRICE_LOADING:
            return '';

        case PRICE_LOADED:
            return action.price;

        default:
            return state;
    }
}
