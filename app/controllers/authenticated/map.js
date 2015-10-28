import Ember from 'ember';

var GameMap = Ember.Object.extend({
  rows: []
});

var MapRow = Ember.Object.extend({
  cells: []
});
var MapCell = Ember.Object.extend({
  text: "."
});

export default Ember.Controller.extend({
  mapWidth: 4,
  mapHeight: 3,

  map: Ember.computed('mapWidth', 'mapHeight', function() {
   var w = this.get('mapWidth');
   var h = this.get('mapHeight');
   return GameMap.create({rows: buildMapRows(w, h)});
  }),

  init: function() {
    this.set('name', 'The Hopeful Forest');
  }
});

var buildMapRows = function(width, height) {
  var rows = [];
  for (var r = 0; r < height; r++) {
    var cells = [];
    for (var c = 0; c < width; c++) {
      var cell = MapCell.create();
      cells.push(cell);
    }
    var row = MapRow.create({cells: cells});
    rows.push(row);
  }
  return rows;


};