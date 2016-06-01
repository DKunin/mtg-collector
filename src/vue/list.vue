<ul>
    <li v-for="card in data" class="mtg-card">
        <h4>{{card.name}} <div style="float:right;">{{card.cost}}</div></h4>
        <h5>{{card.subtypes.join(',')}}</h5>
        <div>Color: {{card.colors.join(',')}}</div>
        <div>{{card.text}}</div>
        <div><i>{{card.editions[0].flavor}}</i></div>
        <div><img v-bind:src="card.editions[0].image_url" /></div>
        <div>{{card.power}}/{{card.toughness}}</div>
    </li>
</ul>