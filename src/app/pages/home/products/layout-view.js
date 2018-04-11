import Marionette from 'backbone.marionette';
import template from './layout-template.hbs';
import ProductsCollectionView from './collection-view';
import ProductsNumberView from './number-item-view';

export default Marionette.View.extend({
  template,

  regions: {
    productsNumber: '.products-number',
    productsRegion: '.products-wrapper',
  },

  initialize(options) {
    this.products = options.products;
  },

  onAttach() {
    this.productsNumberView = new ProductsNumberView({
      products: this.products,
    });

    this.productsCollectionView = new ProductsCollectionView({
      collection: this.products,
    });

    this.showChildView('productsNumber', this.productsNumberView);
    this.showChildView('productsRegion', this.productsCollectionView);
  },
});
