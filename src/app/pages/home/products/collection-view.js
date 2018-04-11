import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore';
import ProductView from './item-view';
import Storage from '../../../utils/storage';
import { filterByFields, filterBySearch } from '../../../utils/service';

export default Marionette.CollectionView.extend({
  childView: ProductView,

  initialize(options) {
    this.collection = options.collection;
    this.collectionDefault = this.collection.clone();
    this.basicChannel = Backbone.Radio.channel('basic');
    /* debounce is here to reduce the number of calls to filterProduct. If user has, say,
    4 filters checked, there will be 4 calls from item-views but we will take into account
    only the last one if all of them are within 300 milliseconds
    */
    this.listenTo(this.basicChannel, 'filter:changed search:changed', _.debounce(this.filterProducts.bind(this), 300));
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

