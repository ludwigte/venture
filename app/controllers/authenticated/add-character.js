import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {

  character: Ember.computed.alias('model'),
  validations: {
    'character.name': {presence: true, length: {minimum: 3}}
  },

  hasItems: Ember.computed.notEmpty('character.items'),
  burdenPercent: Ember.computed('character.itemWeight', 'character.maxWeight', function() {
    return Math.min(this.get('character.itemWeight') / this.get('character.maxWeight') * 100, 100);
  }),

  _modifyStat: function(stat, amount){
    this.set('character.'+stat, this.get('character.'+stat)+amount);
  },

  actions: {
    randomizeCharacter: function()
    {
      var randomCharacter = this.get('randomCharacterGenerator').randomize();
      this.set('character', randomCharacter);
    },

    levelUp: function() {
      this.incrementProperty('character.level');
      this.send('showModal', {
        template: 'level-character',
        character: this.get('character'),
        pointsLeft: 3
      });
    },

    removeCharacter: function() {
      this.get('character').deleteRecord();
      this.get('character').save().then(() => {
        this.transitionToRoute('authenticated.characters');
      });
    },

    saveCharacter: function() {
      if(this.get("isValid")) {
        this.get('character').save();
      }
    },

    removeItem: function(item) {
      this.get('character.items').removeObject(item);
    },
    addItem: function() {
      // TODO make this come from a random item generator?
      if(!this.get('character.hampered')) {
        var item = this.store.createRecord('item',
          {
          name: 'Sword of Life',
          weight: 4,
          constitutionBonus: 3
        });
        item.save();
        this.get('character.items').pushObject(item);
      }
    },
    increaseStat: function(stat) {
      this._modifyStat(stat, 1);
    },

    decreaseStat: function(stat) {
      this._modifyStat(stat, -1);
    },
  }
});