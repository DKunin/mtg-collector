<template>
  <div id="app">
    <div>
      {{authe.username}}
      <a v-link="{ path: '/' }">Search</a>
      <a v-link="{ path: '/collection' }">Collection ({{collection.length}})</a>
      <a v-link="{ path: '/decks' }">Decks</a>
      <a v-link="{ path: '/import' }">Import</a>
      <a v-link="{ path: '/export' }">Export</a>
      <router-view></router-view>
    </div>
    <div>
      <login></login>
    </div>
    {{authe.username}}
    <button v-on:click="testAuth">+</button>
  </div>
</template>

<script>
  import store from './store'
  import login from './views/login.vue';

  export default {
    components: {
      login
    },
    created() {
      store.dispatch(store.actions.authRestore());
    },
    methods: {
      testAuth: function(){
        store.dispatch(store.actions.testAuth({user: 'Someone'}));
      }
    },
    data () {
      return {
        collection: this.$select('collection'),
        authe: this.$select('auth as authe')
      }
    }
  }
</script>