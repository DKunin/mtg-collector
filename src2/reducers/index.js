import { combineReducers } from 'redux';
import todos from './todos';
import counter from './counter';
import search from './search';

export default combineReducers({
    search,
    todos,
    counter
});
