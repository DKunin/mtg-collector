<style>
    .edition-tag {
        margin: 0 5px;
        padding: 3px;
        background-color: #424242;
        color: white;
        display: inline-block;
        cursor: pointer;
    }
    .edition-tag-current {
        font-weight: bold;
    }
</style>
<template>
    <div v-if="card.name">
        <h4>{{card.name}} <div style="float:right;">{{card.cost}}</div></h4>
        <h5>{{(card.subtypes || []).join(',')}}</h5>
        <button v-if="!collectionView" v-on:click="addToCollection(card.id)">Add to collection</button>
        <div>Color: {{(card.colors || []).join(',')}}</div>
        <div>{{card.text}}</div>
        <div><i>{{card.editions[selectedEditionIndex].flavor}}</i></div>
        <div><img v-bind:src="card.editions[selectedEditionIndex].image_url" /></div>
        <span v-for="edition in card.editions" 
            <span class="edition-tag" v-bind:class="{ 'edition-tag-current': selectedEditionIndex===$index }" v-on:click="setSelectedIndex($index)" title="{{edition.set}}">{{edition.set_id}}</span>
        </span>
        <div v-if="card.power">{{card.power}}/{{card.toughness}}</div>
        <div v-if="collectionView">
            <h3>Editing</h3>
            <form v-on:submit.prevent="saveCardData">
                <input type="hidden" name="id" value="{{card.id}}"/>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Quantity
                            </td>
                            <td>
                                <input name="quantity" type="text" value="{{quantity}}"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Posessed edition
                            </td>
                            <td>
                                <input name="posessedEdition" type="text" value="{{card.posessedEdition}}"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Foil
                            </td>
                            <td>
                                <input name="foil" type="checkbox" value="{{card.foil}}"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Comment
                            </td>
                            <td>
                                <textarea name="comment">
                                </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Not for sale
                            </td>
                            <td>
                                <input name="notforsale" type="checkbox" value="{{card.notforsale}}"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Save</button>
            </form>
        </div>
    </div>
</template>

<script>
    import store from '../store';

    export default {
        props: {
            card: Object,
            collectionView: Boolean,
            selectedEditionIndex: { type: Number, default: 0 }
        },
        watch: {
            'card': function() {
                this.selectedEditionIndex = 0;
            }
        },
        computed: {
            quantity: function(){
                return Number(this.card.quantity || 0);
            }
        },        
        methods: {
          addToCollection (id) {
            store.dispatch(store.actions.collectionAddCard(id))
          },
          saveCardData (e) {
            this.$dispatch('update-card', this.card.id, e.target)
          },
          setSelectedIndex (index) {
            this.selectedEditionIndex = index;
          }
        }
    }
</script>
