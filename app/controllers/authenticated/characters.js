import Ember from 'ember';

export default Ember.Controller.extend({
  characters: Ember.computed.alias('model')
});