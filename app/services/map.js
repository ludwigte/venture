import Ember from 'ember';

export default Ember.Service.extend({
  allCells: {},
  updateCount: 0,

  addToWorldView: function(viewUpdate){
    let x = viewUpdate.get('x');
    let y = viewUpdate.get('y');
    let tiles = viewUpdate.get('tiles');
    let w = viewUpdate.get('width');
    let h = viewUpdate.get('height');

    var cells = this.get('allCells');
    for(let i = 0; i < h; i++) {

      for(let j = 0; j < w; j++) {
        var v = tiles[i*w+j];
        let worldX = x+j;
        let worldY = y+i;
        cells[worldX] = cells[worldX] || {};

        var cellClass = this.container.lookupFactory('service:map-cell');
        cells[worldX][worldY] = cells[worldX][worldY] || cellClass.create();
        cells[worldX][worldY].set('tile', v);
      }
    }
    this.incrementProperty('updateCount');
  },
});
