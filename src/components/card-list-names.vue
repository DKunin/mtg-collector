<template>
  <ul>
    <li v-for="card in data" class="mtg-card">
        {{card.name}} 
        <button style="float:right;" v-on:click="removeFromCollection(card.id)">Delete</button>
        <div style="float:right;">{{(card.colors || []).join(',')}} {{card.cost}}</div>
    </li>
</ul>
</template>

<script>
    import store from '../store'

    export default {
        props: {
            data: Array
        },
        methods: {
          removeFromCollection (id) {
            store.dispatch(store.actions.collectionRemoveCard(id))
          }
        }
    }
</script>
