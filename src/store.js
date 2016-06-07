import Vue from 'vue';
import Revue from 'revue';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';
import * as cardsActions from './actions/cards';
import * as searchActions from './actions/search';
import * as collectionActions from './actions/collection';
import * as priceActions from './actions/possible-price';
import * as authActions from './actions/auth';
const mergedActions = { ...cardsActions, ...searchActions, ...collectionActions, ...priceActions, ...authActions };
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const reduxStore = createStoreWithMiddleware(reducer);

const store = new Revue(Vue, reduxStore, mergedActions);

if (typeof __DEV__ !== 'undefined' && __DEV__) {
    window.store = store;
}

export default store;
