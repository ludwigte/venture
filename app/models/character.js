import Ember from 'ember';
import DS from 'ember-data';

const BASE_HP = 40;
const BASE_MP = 30;

export default DS.Model.extend({
  // statPointsToSpend: DS.attr('number', {defaultValue: 20}),
  statPointsToSpend: 20,

  // TODO make these based on max health/mana?
  currentHealth: DS.attr('number', {defaultValue: 1}),
  currentMana: DS.attr('number', {defaultValue: 1}),

  name: DS.attr('string', {
    defaultValue: function() {
      var names = ['Zultar', 'Zorky', 'Merlin'];
      return names[Math.floor(Math.random()*names.length)];
    }
  }),
  characterClass: DS.attr('string', {defaultValue: function() {
    var classes = ['Wizard', 'Warrior', 'Bard'];
    return classes[Math.floor(Math.random()*classes.length)];
  }}),

  level: DS.attr('number', {defaultValue: 1}),
  intelligence: DS.attr('number',{defaultValue:1}),
  strength: DS.attr('number',{defaultValue:1}),
  wisdom: DS.attr('number',{defaultValue:1}),
  constitution: DS.attr('number',{defaultValue:1}),
  dexterity: DS.attr('number',{defaultValue:1}),
  charisma: DS.attr('number',{defaultValue:1}),
  

  items: DS.hasMany('items',{async: true}),
  
  maxHealth: Ember.computed('level', 'effectiveConstitution', function() {
    return BASE_HP + (this.get('effectiveConstitution') * this.get('level'));
  }),
  
  maxMana: Ember.computed('level', 'intelligence', function() {
    return BASE_MP + (this.get('intelligence') * this.get('level'));
  }),
  
  itemWeights: Ember.computed.mapBy('items','weight'),
  itemWeight: Ember.computed.sum('itemWeights'),
  hampered: Ember.computed('itemWeight','maxWeight', function(){
     return this.get('itemWeight') > this.get('maxWeight');
  }),
  maxWeight: Ember.computed('strength', function() {
     return this.get('strength') * 5; 
  }),
  
  itemConstitutionBonuses: Ember.computed.mapBy('items','constitutionBonus'),
  constitutionBonus: Ember.computed.sum('itemConstitutionBonuses'),
  effectiveConstitution: Ember.computed('constitutionBonus','constitution', function() {
    return this.get('constitution') + this.get('constitutionBonus');
  })

});