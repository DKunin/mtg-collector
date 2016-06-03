<template>
  <ul>
    <li v-for="card in data" class="mtg-card">
        <card-view :card="card"></card-view>
    </li>
</ul>
</template>

<script>
    import store from '../store'
    import cardView from '../components/card-view'

    export default {
        components: {
          cardView
        },
        props: {
            data: Array
        }
    }
</script>
