import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app';

Vue.use(VueRouter);
if (__DEV__) {
    window.Vue = Vue;
}

Vue.config.debug = true;

export const router = new VueRouter();
router.map({
    '/': {
        component: require('./views/search')
    },
    '/login': {
        component: require('./views/login')
    },
    '/collection': {
        component: require('./views/collection')
    },
    '/decks': {
        component: require('./views/decks')
    },
    '/import': {
        component: require('./views/import')
    },
    '/export': {
        component: require('./views/export')
    }
});

router.redirect({
    '*': '/'
});

router.start(App, '#app');
