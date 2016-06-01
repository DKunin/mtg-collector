var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);
var listTemplate = require('raw!../vue/list.vue');

Vue.component('vlist', {
    template: listTemplate,
    replace: true,
    props: {
        data: Array
    }
});

var Search = Vue.extend({
    template: '#demo-template',
    data: function() {
        return {
            mtgquery: '',
            mtgcards: [{ name: '123' }]
        };
    },
    methods: {
        fetchData: function(e) {
            e.preventDefault();
            var xhr = new XMLHttpRequest();
            var self = this;
            if (!this.mtgquery) {
                return false;
            }
            xhr.open('GET', 'https://api.deckbrew.com/mtg/cards?name=' + this.mtgquery);
            xhr.onload = function() {
                self.mtgcards = JSON.parse(xhr.responseText);
            };
            xhr.send();
        }
    }
});

var Dev = Vue.extend({
    template: '<p>In dev</p>'
});

var App = Vue.extend({});
var router = new VueRouter();

router.map({
    '/search': {
        component: Search
    },
    '/list': {
        component: Dev
    },
    '/decks': {
        component: Dev
    },
    '/import': {
        component: Dev
    }
});

router.start(App, '#app');
