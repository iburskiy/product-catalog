/* eslint-disable no-param-reassign */
import Marionette from 'backbone.marionette';
import ProductView from './item-view';
import Storage from '../../../utils/storage';


export default Marionette.CollectionView.extend({
  childView: ProductView,

  initialize(options) {
    this.collection = options.collection;
    this.collectionDefault = this.collection.clone();
    this.listenTo(Storage.filtersState, 'change', this.filterProducts);
    this.listenTo(Storage.searchModel, 'change', this.filterProducts);
  },

  filterProducts() {
    let result = this.filterByFields(Storage.filtersState, this.collectionDefault.models);
    result = this.filterBySearch(result, Storage.searchModel.get('search'));
    this.collection.reset(result);
    this.trigger('filter:products');
  },

  filterByFields(filters, collection) {
    const attrs = filters.attributes;
    if (!collection.length) {
      return [];
    }

    let filterCollection;
    Object.keys(attrs).forEach((type) => {
      filterCollection = attrs[type];
      if (filterCollection.length) {
        collection = collection.filter(item =>
          filterCollection.findWhere({ name: item.get(type) }));
      }
    });

    return collection;
  },

  filterBySearch(collection, search) {
    return collection.filter(model => (`${model.get('manufacturer')} ${model.get('model')}`).match(new RegExp(search, 'i')));
  },

  onAttach() {
    this.filterProducts();
  },
});

