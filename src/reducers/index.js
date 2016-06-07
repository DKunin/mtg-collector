import { combineReducers } from 'redux';
import search from './search';
import cards from './cards';
import possiblePrice from './possible-price';
import collection from './collection';
import auth from './auth';

export default combineReducers({
    possiblePrice,
    collection,
    search,
    auth,
    cards
});
