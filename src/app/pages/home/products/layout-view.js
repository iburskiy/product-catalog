import Marionette from 'backbone.marionette';
import template from './layout-template.hbs';
import ProductsCollectionView from './collection-view';
import ProductsNumberView from './number-item-view';

export default Marionette.LayoutView.extend({
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

    this.listenTo(this.productsCollectionView, 'filter:products', this.productsNumberView.triggerMethod.bind(this.productsNumberView, 'filter:products'));

    this.productsNumber.show(this.productsNumberView);
    this.productsRegion.show(this.productsCollectionView);
  },
});
