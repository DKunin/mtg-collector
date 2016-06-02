<template>
  <search></search>
  {{search}}
</template>

<script>
  import search from '../components/search'
  import store from '../store'

  export default {
    components: {
      search
    },
    created: function(){

    },
    data () {
      return {
        search: this.$select('search')
      }
    }
  }
</script>
