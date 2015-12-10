import randomCharacterGenerator from 'venture/helpers/random-character-generator';
import { module, test } from 'qunit';

module('Unit | Utility | helpers/random character generator');

// Replace this with your real tests.
// test('it works', function(assert) {
//   var result = randomCharacterGenerator();
//   assert.ok(result);
// });

test('it works', function(assert) {

  var char = Ember.Object.create({statPointsToSpend: 100});
  var arg1;
  var store = {
     createRecord: function(a) { arg1 = a; return char; }
  };
  var subject = RandomCharacterGenerator.create();
  subject.store = store;
  var newChar = subject.randomize();
  assert.ok(newchar, 'character returned');
  assert.equal(newChar, char);
  assert.ok(newChar.get("intelligence") > 0, 'int got some points');
  assert.equal(newChar.get('statPointsToSpend'), 0, 'stat points were used');
});
