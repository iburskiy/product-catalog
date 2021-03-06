import Marionette from 'backbone.marionette';
import layoutTemplate from './layout-template.hbs';
import ProductLayoutView from './products/layout-view';
import FilterLayoutView from './filters/layout-view';

export default Marionette.View.extend({

  template: layoutTemplate,

  initialize(options) {
    this.products = options.products;
    this.filterFields = options.filterFields;
  },

  regions: {
    productsRegion: '#products',
    filtersRegion: '#filters',
  },

  onAttach() {
    const productsView = new ProductLayoutView({
      products: this.products.clone(),
    });

    const filterLayoutView = new FilterLayoutView({
      products: this.products,
      filterFields: this.filterFields,
    });

    this.showChildView('productsRegion', productsView);
    this.showChildView('filtersRegion', filterLayoutView);
  },
});
