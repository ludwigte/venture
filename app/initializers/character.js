import RandomCharacterGenerator from 'venture/helpers/random-character-generator';

export function initialize(container, application) {
   container.register('random-char-gen:main', RandomCharacterGenerator);
   application.inject('controller', 'randomCharacterGenerator', 'random-char-gen:main');
   application.inject('random-char-gen:main', 'store', 'store:main');
}

export default {
  name: 'character',
  initialize: initialize
};