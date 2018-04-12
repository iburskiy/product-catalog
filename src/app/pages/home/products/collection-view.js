import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import ProductView from './item-view';
import Storage from '../../../utils/storage';
import { filterByFields, filterBySearch } from '../../../utils/service';

export default Marionette.CollectionView.extend({
  childView: ProductView,

  initialize(options) {
    this.collection = options.collection;
    this.collectionDefault = this.collection.clone();
    this.basicChannel = Backbone.Radio.channel('basic');
    this.listenTo(this.basicChannel, 'filter:changed filters:cleared', this.filterProducts.bind(this));
  },

  filterProducts() {
    let result = filterByFields(this.collectionDefault.models, Storage.filtersState);
    result = filterBySearch(result, Storage.searchModel.get('search'));
    this.collection.reset(result);
    this.basicChannel.trigger('products:filtered');
  },

  onAttach() {
    this.filterProducts();
  },
});

