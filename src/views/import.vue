<template>
  <h3>Import</h3>
  <form v-on:submit.prevent="exportCards">
    <textarea v-model="importlist"></textarea>
    <button type="submit">Import</button>
  </form>
</template>

<script>
    import store from '../store'

    export default {
        data() {
            return {
                importlist: ''
            }
        },
        methods: {
            exportCards() {
                store.dispatch(store.actions.collectionImportCards(this.importlist.split('\n').filter(Boolean).map(singleItem => singleItem.trim())))
            }
        },
    }
</script>
