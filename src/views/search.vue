<template>
  <h3>Search</h3>
  <search :search="search"></search>
  <div>Cards found: {{cards.length}}</div>
  <card-list :data="cards"></card-list>
</template>

<script>
  import search from '../components/search'
  import cardList from '../components/card-list'
  import store from '../store'

  export default {
    components: {
      search,
      cardList
    },
    data () {
      return {
        search: this.$select('search'),
        cards: this.$select('cards')
      }
    }
  }
</script>
