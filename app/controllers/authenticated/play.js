import Ember from 'ember';

export default Ember.Controller.extend({
  mapWidth: 20,
  mapHeight: 20,
  map: Ember.inject.service(),
  character: Ember.computed.alias('model'),

  rows: Ember.computed('map.allCells','map.updateCount', 'mapWidth', 'mapHeight', 'character.{x,y}', function() {
    var w = parseInt(this.get('mapWidth'), 10);
    var h = parseInt(this.get('mapHeight'), 10);
    var startX = this.get('character.x') - Math.floor(w/2);
    var stopX = startX + w;
    var startY = this.get('character.y') - Math.floor(h/2);
    var stopY = startY + h;
    var rows = [];
    var cellClass = this.container.lookupFactory('service:map-cell');

    for(let i = startY; i < stopY; i++) {
      let row = [];
      for(let j = startX; j < stopX; j++) {
        let cell;
        var thing = this.get('map.allCells');
        if(thing && thing[j]) {
          cell = thing[j][i] || cellClass.create({text: '?'});
        } else {
          cell = cellClass.create({text: '?'});
        }
        row.push(cell);
      }
      rows.push(row);
    }

    return rows;
  }),
  
  init: function() {
    this.set('name', 'The Hopeful Forest');
  },

  actions: {
    move: function(x,y) {
      var char = this.get('character');
      var oldChar = this.get('map.allCells')[char.get('x')][char.get('y')];

      char.setProperties({x: char.get('x')+x, y: char.get('y')+y});

      char.save().then( () => {
        return this.store.query('world-view', { character_id: char.get('id')}).then((worldViews) => {
          this.get('map').addToWorldView(worldViews.get('firstObject'));
          if (oldChar) {
            oldChar.set('hasCharacter', false);
          }
          this.get('map.allCells')[char.get('x')][char.get('y')].set('hasCharacter', true);

        });
      });
    }
  }


});