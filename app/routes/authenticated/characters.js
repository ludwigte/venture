import Ember from 'ember';

export default Ember.Route.extend({
  //model: function() {
  //  return this.store.findAll('character');
  //}
  model: function() {
    let charPromise = this.store.findAll('character');
    return new Ember.RSVP.Promise((resolve,reject) => {
      return Ember.run.later(() => {
        charPromise.then(chars => {
          if(chars.length === 0) {
            resolve(charPromise);
          }
          else {
            reject('Error: Empty Character!');
          }
        });
      }, 2000);
    }).then(null, err => {alert(err.error)});

  }
});