<template>
  <h3>Owned cards</h3>
  <card-list-names :data="collection"></card-list-names>
</template>

<script>
  import store from '../store'
  import cardListNames from '../components/card-list-names'

  export default {
    components: {
        cardListNames
    },
    created () {
        store.dispatch(store.actions.collectionLoad())
    },
    data () {
      return {
        collection: this.$select('collection')
      }
    }
  }
</script>
