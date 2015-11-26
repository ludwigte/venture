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

test('blocks users when not logged in', function(assert) {
  visit('/authenticated/characters');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

Ember.Test.registerAsyncHelper('resumablePause', function(app) {
  Ember.Test.adapter.asyncStart();
  return new Ember.RSVP.Promise(function(resolve) {
    window.continueTest = function() {
      resolve();
    };
  }, 'Test Adapter paused');
})

test('can view characters when logged in', function(assert) {
  visit('/authenticated/characters');
  andThen(function() {
    assert.equal(currentURL(), '/');
  });
  fillIn('.app-email','test@example.com');
  fillIn('.app-password','asdfasdf');
  click('button');
  andThen(function() {
    assert.equal(currentURL(), '/authenticated/characters');
  });
});
