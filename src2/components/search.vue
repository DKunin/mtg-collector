<template>
  <input v-model="search" />
  <button @click="setQueryHandle()">Search</button>
</template>

<script>
  import store from '../store'
  import { querySet as querySetAction } from '../actions/search'
  export default {
    ready () {
      console.log('search ready');
    },
    data () {
      return {
        search: this.$select('search')
      }
    },
    methods: {
      setQueryHandle (index) {
        store.dispatch(store.actions.querySet(this.search))
        //store.dispatch(setQuery(this.mtgquery))
      }
    }
  }
</script>
