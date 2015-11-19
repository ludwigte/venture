import Ember from 'ember';

export default Ember.Controller.extend({
  hasPointsLeft: Ember.computed.gt('model.pointsLeft', 0),
  character: Ember.computed.alias('model.character'),

  actions: {
    saveCharacter: function() {
      this.get('character').save();
      this.send('closeModal');
    }
  }
});