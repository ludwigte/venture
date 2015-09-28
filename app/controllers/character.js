import Ember from 'ember';

export default Ember.Controller.extend({
  character: Ember.computed.alias('model'),
  
  hasItems: Ember.computed.notEmpty('character.items'),
  burdenPercent: Ember.computed('character.itemWeight', 'character.maxWeight', function() {
    return Math.min(this.get('character.itemWeight') / this.get('character.maxWeight') * 100, 100);
  }),
  
  _modifyStat: function(stat, amount){
    this.set('model.'+stat, this.get('model.'+stat)+amount);
  },
  
  actions: {
    removeItem: function(item) {
      this.get('character.items').removeObject(item);
    },
    addItem: function() {
      // TODO make this come from a random item generator?
      var item = this.store.createRecord('item',
        {
        name: 'Sword of Life',
        weight: 4,
        constitutionBonus: 3
      });
      this.get('character.items').pushObject(item);
    },
    increaseStat: function(stat) {
      this._modifyStat(stat, 1);
    },
    
    decreaseStat: function(stat) {
      this._modifyStat(stat, -1);
    },
  }
});