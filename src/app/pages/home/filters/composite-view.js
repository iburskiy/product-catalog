import Marionette from 'backbone.marionette';
import FilterView from './item-view';
import template from './composite-template.hbs';

export default Marionette.CompositeView.extend({
  template,
  childView: FilterView,
  childViewContainer: 'ul',

  initialize(options) {
    this.collection = options.collection;
    this.model = options.model;
  },
});
