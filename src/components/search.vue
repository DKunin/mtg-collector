<template>
  <form v-on:submit.prevent="setQueryHandle">
    <input v-model="search" />
    <button type="submit">Search</button>
  <form>
</template>

<script>
  import store from '../store'
  import { querySet as querySetAction } from '../actions/search'
  export default {
    props: {
        search: String
    },
    methods: {
      setQueryHandle () {
        store.dispatch(store.actions.querySet(this.search))
        store.dispatch(store.actions.cardsLoad(this.search))
      }
    }
  }
</script>
