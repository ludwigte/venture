import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',

  actions: {
    increaseStat: function() {
      this.incrementProperty('stat');
    },
    decreaseStat: function() {
      this.decrementProperty('stat');
    },
  }
});