import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('character').then( chars => {
      return this.store.find('world-view', { character_id: chars.get('firstObjet.id') }).then(() => {alert('wah');});
    });
  }
});