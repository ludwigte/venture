import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'venture/tests/helpers/start-app';
import Pretender from 'pretender';
var H = window; // H is for helper

module('Acceptance | characters', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    if (server) {
      server.shutdown(); // so that we start fresh with the next test
    }
    Ember.run(this.application, 'destroy');
  }
});

test('Blocks users when not logged in', function(assert) {
  visit('/authenticated/characters');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

Ember.Test.registerAsyncHelper('resumablePause', function() {
  Ember.Test.adapter.asyncStart();
  return new Ember.RSVP.Promise(function(resolve) {
    window.continueTest = function() {
      Ember.Test.adapter.asyncEnd();
      resolve();
    };
  }, 'Test Adapter paused');
});

Ember.Test.registerAsyncHelper('seeOn', function(app, assert, url) {
  assert.equal(currentURL(), url);
});

Ember.Test.registerAsyncHelper('loginAs', function(app, u, p) {
  fillIn('.app-email', u);
  fillIn('.app-password', p);
  // click('.app-login-button')
  click('button');
});

var server;
test('Can view characters when logged in', function(assert) {
  server = new Pretender(function(){
    this.get("/characters", function(){
      return [200, {}, JSON.stringify(
        []
      )];
    });
    this.post('/users/sign_in', function(){
      return [201, {}, JSON.stringify({
        token: 'someTokenString',
        email: 'test@example.com'
      })];
    });
  });

  H.visit('/authenticated/characters');
  H.seeOn(assert, "/");
  H.loginAs("test@example.com", "asdfasdf");
  H.seeOn(assert, "/authenticated/characters");

//   andThen(function() {
//     assert.equal(currentURL(), '/');
//   });
//   fillIn('.app-email','test@example.com');
//   fillIn('.app-password','asdfasdf');
//     // click('.app-login-button')
//   resumablePause();
//   click('button');
//   andThen(function() {
//     assert.equal(currentURL(), '/authenticated/characters');
//   });

});
