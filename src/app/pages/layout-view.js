import Marionette from 'backbone.marionette';
import layoutTemplate from './layout-template.hbs';
import ProductLayoutView from './home/products/layout-view';
import FilterLayoutView from './home/filters/layout-view';

export default Marionette.LayoutView.extend({

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

    this.productsRegion.show(productsView);
    this.filtersRegion.show(filterLayoutView);
  },
});
