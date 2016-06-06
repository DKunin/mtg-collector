<style>
  .right-half, .left-half {
    width: 50%;
    float: left;
    min-height: 1px;
  }
  .hidden {
    display: none;
  }
  .filter-line {
    clear: both;
  }
</style>

<template>
  <h3>Owned cards</h3>
  <div class="hidden">
    <label for="black"><input v-on:change="addFilterReducer('black')" type="checkbox" id="black"/> Black</label>
    <label for="red"><input v-on:change="addFilterReducer('red')" type="checkbox" id="red"/> red</label>
  </div>
  <div class="filter-line">
     <input v-model="search" type="text"/>
  </div>
  <div class="right-half">
    <card-view :card="selectedCard" :collection-view="true"></card-view>
    <card-edit :card="selectedCard"></card-edit>
    <div>Possible price: {{possiblePrice}}</div>
    <div v-if="possiblePrice"><i>Price source: http://magictcgprices.appspot.com</i></div>
    <button v-on:click="loadPossiblePrice">Load possible Price</button>
  </div>
  <div class="left-half">
    <card-list-names :data="collectionFiltered"></card-list-names>
  </div>
</template>

<script>
    import store from '../store';
    import cardListNames from '../components/card-list-names';
    import cardView from '../components/card-view';
    import cardEdit from '../components/card-edit';
    import { filterByColor, cloneArray } from '../../modules/helpers';
    
    var reducersCodes = {
        black: filterByColor('black'),
        red: filterByColor('red')
    }

    export default {
        components: {
            cardListNames,
            cardView,
            cardEdit
        },
        computed: {
            collectionFiltered: function(){
                if (!this.search || this.search === '') {
                    return this.collection;
                }
                var searchQuery = this.search.toLowerCase();
                return this.collection.filter(({ name }) => name.toLowerCase().indexOf(searchQuery)!==-1);
            }, 
            selectedCard: function() {
                if (!this.selectedCardIndex && this.selectedCardIndex !== 0) {
                    return {}
                }
                return this.collectionFiltered[this.selectedCardIndex];
            }
        },
        events: {
            'select-card': function (selectedCardIndex) {
                this.selectedCardIndex = selectedCardIndex;
            },
            'update-card': function (id, form) {
                store.dispatch(store.actions.collectionUpdateCard(id, form));
            }
        },
        methods: {
            addFilterReducer: function (color) {
                var reducers = this.reducers;
                if (!reducers[color]) {
                    reducers[color] = reducersCodes[color];
                } else {
                    reducers = Object.keys(reducers).reduce((newObject, oldKey) => {
                        if (oldKey === color) {
                            return newObject;
                        }
                        return Object.assign({}, newObject, {[color]: reducersCodes[color]})
                    },{})
                }
                this.reducers = reducers;
            },
            loadPossiblePrice: function(){
                store.dispatch(store.actions.priceLoad(this.collectionFiltered[this.selectedCardIndex].name))
            }
        },
        watch: {
            'selectedCard': function() {
                store.dispatch(store.actions.priceLoading())
            }
        },
        created () {
            store.dispatch(store.actions.collectionLoad())
        },
        data () {
            return {
                search: '',
                reducers: {},
                selectedCardIndex: false,
                collection: this.$select('collection'),
                possiblePrice: this.$select('possiblePrice')
            }
        }
    }
</script>
