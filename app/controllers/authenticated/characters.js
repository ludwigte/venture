import Ember from 'ember';

import EmberValidations from 'ember-validations';


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

export default Ember.Controller.extend(EmberValidations, {
  validations: {
    'character.name': {presence: true, length: {minimum: 3}}
  },
  characters: Ember.computed.alias('model'),
  character: Ember.computed.alias('characters.firstObject'),

  hasItems: Ember.computed.notEmpty('character.items'),
  hasCharacters: Ember.computed.notEmpty('characters'),
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
      if(this.get("isValid")) {
        this.get('character').save();
      }
    },

    addCharacter: function() {
      var char = this.store.createRecord('character');
      this.set('character', char);
    },
    levelUp: function() {
      this.send('showModal', {
          template: 'level-character',
          character: this.get('character')
       });
    },
    increaseStat: function(stat) {
      this._modifyStat(stat, 1);
    },

    decreaseStat: function(stat) {
      this._modifyStat(stat, -1);
    },
  }
});