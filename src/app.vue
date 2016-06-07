<template>
  <div id="app">
    <a v-link="{ path: '/' }">Search</a>
    <a v-link="{ path: '/collection' }">Collection ({{collection.length}})</a>
    <a v-link="{ path: '/decks' }">Decks</a>
    <a v-link="{ path: '/import' }">Import</a>
    <a v-link="{ path: '/export' }">Export</a>
    {{auth.username}}  
    <router-view></router-view>
  </div>
</template>

<script>
  import store from './store'

  export default {
    data () {
      console.log(this.$select('auth'));
      return {
        collection: this.$select('collection'),
        auth: this.$select('auth')
      }
    }
  }
</script>