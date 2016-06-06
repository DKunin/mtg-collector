<style>
    .single-owned-card {
        list-style: none;
        border: 1px solid #424242;
    }
</style>
<template>
    <div v-if="card && card.name">
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
                            {{quantity}}
                            <button v-on:click.prevent="appendCard()" type="button"/> + </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <li v-for="own in owned" class="single-owned-card">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            Posessed edition
                        </td>
                        <td>
                            <input name="edition-key[{{$index}}]" value="{{own.id}}" type="hidden"/>
                            <select name="edition-{{own.id}}" >
                                <option selected="{{own.edition === edition.set_id}}" v-for="edition in card.editions" value={{edition.set_id}}>
                                    {{edition.set}}
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Foil
                        </td>
                        <td>
                            <input name="foiled-{{own.id}}" type="checkbox" checked="{{own.foiled === 'on'}}"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Comment
                        </td>
                        <td>
                            <textarea name="comment-{{own.id}}">{{own.comment}}</textarea>
                        </td>
                    <tr>
                    </tr>
                    <tr>
                        <td>
                            Price
                        </td>
                        <td>
                            <input name="price-{{own.id}}" type="text" value="{{own.price}}"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Remove
                        </td>
                        <td>
                            <button type="button" v-on:click="removeOwn(own.id)"> - </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </li>
            <button type="submit">Save</button>
        </form>
    </div>
</template>

<script>
    import store from '../store';

    export default {
        props: {
            card: Object
        },
        watch: {
            'card': function() {
                this.selectedEditionIndex = 0;
                const form = this.$el.parentNode.querySelector('form');
                form ? form.reset() : null;
                this.ownedState = this.card.owned || []
            }
        },
        computed: {
            quantity: function(){
                return this.ownedState.length;
            },
            owned: function(){
                return this.ownedState;
            }
        },
        data () {
            return {
                ownedState: this.card.owned || []
            }
        },
        methods: {
            appendCard () {
                this.ownedState = this.ownedState.concat({ 
                    id: new Date().getTime() + this.card.id, 
                    edition: '', 
                    foiled: false, 
                    notforsale: false, 
                    price: 0, 
                    comment: ''
                });
            },
            removeOwn (fid) {
                this.ownedState = this.ownedState.filter(({ id }) => id!== fid);
            },
            saveCardData (e) {
                this.$dispatch('update-card', this.card.id, e.target)
            }
        }
    }
</script>
