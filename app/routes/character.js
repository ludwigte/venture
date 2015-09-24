import Ember from 'ember';
//import Character from 'venture/models/character';

export default Ember.Route.extend({
  model: function() {
    // to do: load data here
    //return Character.create();
    var char = this.store.createRecord('character');
    char.save();
    return char;
  }
});