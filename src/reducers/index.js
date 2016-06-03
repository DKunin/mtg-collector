import { combineReducers } from 'redux';
import search from './search';
import cards from './cards';
import collection from './collection';

export default combineReducers({
    collection,
    search,
    cards
});
