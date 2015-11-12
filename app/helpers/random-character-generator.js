import Ember from 'ember';

export default Ember.Object.extend({

    random: function() {
      var char = this.store.createRecord('character');
      var numStats = 6;

      const stats = ['intelligence', 'strength', 'wisdom', 'dexterity', 'constitution', 'charisma'];

      // choose random name for character
      var points = char.get('statPointsToSpend');

      for( let i = 0; i < points; i++ ) {
        var j = Math.floor(Math.random*numStats);
        let statName = stats[j];
        char.incrementProperty(statName);
      }
      char.set('statPointsToSpend', 0);

    return char;
  }
});
