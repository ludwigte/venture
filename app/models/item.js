import Ember from 'ember';

var Item =  Ember.Object.extend({
  name: "",
  weight: 0,
  bonuses: {
    constitution: 0,
    strength: 0
  },
  bonusStrings: Ember.computed('bonuses.constitution', function() {
    return [
      "constitution "+"+"+this.get('bonuses.constitution')
    ];
  })
  
});

Item.reopenClass({
  createRandom: function() {
    return Item.create({
      name: "magic sword of life", 
      weight: 4, 
      bonuses:{constitution: 3}});
  } 
});

export default Item;