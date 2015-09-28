import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  character: DS.belongsTo('character'),

  name: DS.attr(),
  weight: DS.attr('number', {defaultValue: 0}),
  constitutionBonus: DS.attr('number', {defaultValue: 0}),

  bonusStrings: Ember.computed('constitutionBonus', function() {
    var bonusStrings = [];
    if(this.get('constitutionBonus') > 0) {
      bonusStrings.push("constitution "+"+"+this.get('constitutionBonus'));
    }
    return bonusStrings;
  })
  
});