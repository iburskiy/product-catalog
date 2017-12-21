import Marionette from 'backbone.marionette';

export var Region = Marionette.RegionManager.extend({
  regions: {
    content: '#content',
  },
});
