import Ember from 'ember';
var ItemDropper = Ember.Object.extend({
    randomItem: function()  {
      const itemDescriptions=[{
        name: 'Sword of Life',
        weight: 4,
        constitutionBonus: 3
      },
       {
        name: 'Sword of Prolonged Life',
        weight: 4,
        constitutionBonus: 6
      }];
      return itemDescriptions[Math.floor(Math.random()*itemDescriptions.length)];
    }
});

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
        ItemDropper.create().randomItem()
       );
      this.get('character.items').pushObject(item);
    },
        changeCharacter: function(char) {
      this.set('character', char);
    },

    removeCharacter: function() {
      this.get('character').deleteRecord();
      var that = this;
      this.get('character').save().then(function() {
        that.set('character');
      });
    },

    saveCharacter: function() {
      this.get('character').save();
    },

    addCharacter: function() {
      var char = this.store.createRecord('character');
      char.save();
      this.set('character', char);
    },
    increaseStat: function(stat) {
      this._modifyStat(stat, 1);
    },

    decreaseStat: function(stat) {
      this._modifyStat(stat, -1);
    },
  }
});