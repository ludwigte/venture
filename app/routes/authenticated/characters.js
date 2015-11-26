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
          if(chars.get("length") > 0) {
            resolve(chars);
          }
          else {
            reject('Error: Empty Character!');
          }
        });
      }, 2000);
    }).then(null, err => {alert(err.error); });

  }
});