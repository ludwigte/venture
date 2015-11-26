import Ember from 'ember';

export default Ember.Service.extend({
  text: Ember.computed('tile', 'hasCharacter', function() {
    if(this.get('hasCharacter')) {
      return "C";
    } else {
      return ""+this.get('tile');
    }
  }),
  tile: -1,
  tileClass: Ember.computed('tile', function() {
    let t = this.get('tile');
    if (t === 0) {
      return 'water';
    } else if (t === 1) {
      return 'grass';
    } else if (t === 2) {
      return 'sand';
    }
  }),
  hasCharacter: false
});