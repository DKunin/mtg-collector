<template>
    <ul>
    <li v-for="card in data" class="mtg-card">
        <a href="#1" v-on:click.prevent="showSpecificCard(card.id)">{{head(card.editions).set_id}} {{card.name}}</a>
        <button style="float:right;" v-on:click="removeFromCollection(card.id)">Delete</button>
        <div style="float:right;">{{(card.colors || []).join(',')}} {{card.cost}}</div>
    </li>
    </ul>
</template>

<script>
    import store from '../store'
    import { head } from '../../modules/helpers'

    export default {
        props: {
            data: Array
        },
        methods: {
            head,
            removeFromCollection (id) {
                store.dispatch(store.actions.collectionRemoveCard(id))
            },
            showSpecificCard (id) {
                this.$dispatch('select-card', this.data.find(singleDataItem => singleDataItem.id === id));
            }
        }
    }
</script>
