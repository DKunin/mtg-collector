<template>
    <h4>{{card.name}} <div style="float:right;">{{card.cost}}</div></h4>
    <h5>{{(card.subtypes || []).join(',')}}</h5>
    <button v-on:click="addToCollection(card.id)">Add to collection</button>
    <div>Color: {{(card.colors || []).join(',')}}</div>
    <div>{{card.text}}</div>
    <div><i>{{card.editions[0].flavor}}</i></div>
    <div><img v-bind:src="card.editions[0].image_url" /></div>
    <div>{{card.power}}/{{card.toughness}}</div>
</template>

<script>
    import store from '../store'

    export default {
        props: {
            card: Object
        },
        methods: {
          addToCollection (id) {
            store.dispatch(store.actions.collectionAddCard(id))
          }
        }
    }
</script>
