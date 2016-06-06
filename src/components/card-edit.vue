<template>
    <div>
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
                                <button type="button"/> + </button>
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
                                <input name="foil" type="checkbox" checked="{{card.foil}}"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Comment
                            </td>
                            <td>
                                <textarea name="comment">{{card.comment}}</textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Not for sale
                            </td>
                            <td>
                                <input name="notforsale" type="checkbox" checked="{{card.notforsale}}"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Price
                            </td>
                            <td>
                                <input name="price" type="text" value="{{card.price}}"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
            }
        },
        computed: {
            quantity: function(){
                return Number(this.card.quantity || 0);
            },
            owned: function(){
                return this.card.owned || this.ownedState;
            }
        },
        data () {
            return {
                ownedState: []
            }
        },
        methods: {
          saveCardData (e) {
            this.$dispatch('update-card', this.card.id, e.target)
          }
        }
    }
</script>
