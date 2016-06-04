<style>
  .right-half, .left-half {
    width: 50%;
    float: left;
    min-height: 1px;
  }
</style>

<template>
  <h3>Owned cards</h3>
  <div>
    <label for="black"><input v-on:change="addFilterReducer('black')" type="checkbox" id="black"/> Black</label>
    <label for="red"><input v-on:change="addFilterReducer('red')" type="checkbox" id="red"/> red</label>
  </div>
  <div class="right-half">
    <card-view :card="selectedCard" :collection-view="true"></card-view>
  </div>
  <div class="left-half">
    <card-list-names :data="collectionFiltered"></card-list-names>
  </div>
</template>

<script>
    import store from '../store';
    import cardListNames from '../components/card-list-names';
    import cardView from '../components/card-view';
    import { filterByColor, cloneArray } from '../../modules/helpers';
    
    var reducersCodes = {
        black: filterByColor('black'),
        red: filterByColor('red')
    }

    export default {
        components: {
            cardListNames,
            cardView
        },
        computed: {
            collectionFiltered: function(){
                var reducers = this.reducers;
                var collection = this.collection;
                var newCollection = Object.keys(reducers).reduce((newArray, curReducer) => {
                    var newFilteredStuff = reducers[curReducer](collection);
                    return newArray.concat(newFilteredStuff);
                }, [])
                return newCollection;
            }
        },
        events: {
            'select-card': function (selectedCard) {
                this.selectedCard = selectedCard;
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
            }
        },
        created () {
            store.dispatch(store.actions.collectionLoad())
        },
        data () {
            return {
                reducers: {},
                selectedCard: {},
                collection: this.$select('collection')
            }
        }
    }
</script>
