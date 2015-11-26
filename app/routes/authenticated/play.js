import Ember from 'ember';

export default Ember.Route.extend({
  map: Ember.inject.service(),
  model: function() {
    return this.store.findAll('character').then( chars => {
      let char = chars.get('firstObject');
      return this.store.query('world-view', { character_id: char.get('id')}).then((worldViews) => {
        this.get('map').addToWorldView(worldViews.get('firstObject'));
        this.get('map.allCells')[char.get('x')][char.get('y')].set('hasCharacter', true);
        return char;
      });

    });
  },
   serialize: function(model) {
    return { character: model.get('id') };
  //},
  //afterModel: function(model) {
    //alert('afterModel');
  }
});

/*
import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
    return this.store.find('character', params.character);
  },

  serialize: function(model) {
    return { character: model.get('id') };
  }

});
*/
