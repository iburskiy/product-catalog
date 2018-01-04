import Marionette from 'backbone.marionette';
import FilterCollectionView from './collection-view';
import template from './composite-template.hbs';

export default Marionette.View.extend({
  template,
  regions: {
    body: '.filter-items',
  },

  initialize(options) {
    this.collection = options.collection;
    this.model = options.model;
  },

  onRender() {
    this.showChildView('body', new FilterCollectionView({
      collection: this.collection,
    }));
  },
});
