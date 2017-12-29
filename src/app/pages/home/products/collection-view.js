import Marionette from 'backbone.marionette';
import ProductView from './item-view';
import Storage from '../../../utils/storage';
import { filterByFields, filterBySearch } from '../../../utils/service';

export default Marionette.CollectionView.extend({
  childView: ProductView,

  initialize(options) {
    this.collection = options.collection;
    this.collectionDefault = this.collection.clone();
    this.listenTo(Storage.filtersState, 'change', this.filterProducts);
    this.listenTo(Storage.searchModel, 'change', this.filterProducts);
  },

  filterProducts() {
    let result = filterByFields(this.collectionDefault.models, Storage.filtersState);
    result = filterBySearch(result, Storage.searchModel.get('search'));
    this.collection.reset(result);
    this.trigger('filter:products');
  },

  onAttach() {
    this.filterProducts();
  },
});

