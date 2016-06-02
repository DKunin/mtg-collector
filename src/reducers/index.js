import { combineReducers } from 'redux';
import search from './search';
import cards from './cards';

export default combineReducers({
    search,
    cards
});
