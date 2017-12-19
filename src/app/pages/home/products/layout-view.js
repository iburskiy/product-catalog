"use strict";
import Marionette from "backbone.marionette";
import template from "./layout-template.hbs";
import ProductsCollectionView from "./collection-view";
import ProductsNumberView from "./number-item-view";

export default Marionette.LayoutView.extend({
  template: template,

  regions: {
    productsNumber: ".products-number",
    productsRegion: ".products-wrapper",
  },

  initialize: function(options) {
    this.products = options.products;
  },

  onAttach: function() {
    this.productsNumberView = new ProductsNumberView({
      products: this.products
    });

    this.productsCollectionView = new ProductsCollectionView({
      collection: this.products
    });

    this.productsNumber.show(this.productsNumberView);
    this.productsRegion.show(this.productsCollectionView);
  },

  onHandleSearch: function(search) {
    this.productsCollectionView.handleSearch(search);
    this.productsNumberView.updateProductsNumber();
  }
});