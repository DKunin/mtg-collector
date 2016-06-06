import { combineReducers } from 'redux';
import search from './search';
import cards from './cards';
import possiblePrice from './possible-price';
import collection from './collection';

export default combineReducers({
    possiblePrice,
    collection,
    search,
    cards
});
