<template>
  <div id="app">

    <a v-link="{ path: '/' }">Search</a>
    <a v-link="{ path: '/collection' }">Collection ({{collection.length}})</a>
    <a v-link="{ path: '/decks' }">Decks</a>
    <a v-link="{ path: '/import' }">Import</a>
    <a v-link="{ path: '/export' }">Export</a>

    <router-view></router-view>
  </div>
</template>

<script>
  import store from './store'

  export default {
    data () {
      return {
        collection: this.$select('collection')
      }
    }
  }
</script>