import Marionette from 'backbone.marionette';
import FilterView from './item-view';

export default Marionette.CollectionView.extend({
  childView: FilterView,
  tagName: 'ul',
});
