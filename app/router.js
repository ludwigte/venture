import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', {path: '/'}); // problem is that now /login doesn't work
  this.route('authenticated', function() {
    this.route('secretz');
    this.route('characters');
    this.route('map');
  });
});

export default Router;