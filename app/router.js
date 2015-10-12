import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('map');
  this.route('character');
  this.route('login');
  this.route('authenticated'), function() {
    this.route('secretz');
  });
});

export default Router;
