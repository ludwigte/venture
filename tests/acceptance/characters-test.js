import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'venture/tests/helpers/start-app';

module('Acceptance | characters', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /characters', function(assert) {
  visit('/authenticated/characters');

  andThen(function() {
    assert.equal(currentURL(), '/authenticated/characters');
  });
});
