import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var char = this.store.createRecord('character');
    var sword = this.store.createRecord('item', {
      name: 'Sword of Life',
      weight: 4,
      constitutionBonus: 3
    });
    char.get('items').pushObject(sword);
    // char.save();
    return char;
  }
});