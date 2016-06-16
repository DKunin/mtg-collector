<template>
  <div id="app">
    <div v-if="auth.username">
      {{auth.username}}
      <a v-link="{ path: '/' }">Search</a>
      <a v-link="{ path: '/collection' }">Collection ({{collection.length}})</a>
      <a v-link="{ path: '/decks' }">Decks</a>
      <a v-link="{ path: '/import' }">Import</a>
      <a v-link="{ path: '/export' }">Export</a>
      <router-view></router-view>
    </div>
    <div v-if="!auth.username">
      <login></login>
    </div>
    <div v-if="auth.newusercreated">
        New user created
    </div>
  </div>
</template>

<script>
  import store from './store'
  import login from './views/login';

  export default {
    components: {
      login
    },
    created() {
      store.dispatch(store.actions.authRestore())
    },
    methods: {
    },
    data () {
      return {
        collection: this.$select('collection'),
        auth: this.$select('auth')
      }
    }
  }
</script>