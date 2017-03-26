"use strict";
import _ from "underscore";
import Backbone from "backbone";
import Marionette from "backbone.marionette";
import layoutTemplate from "./layout-template.hbs";
import ProductCollectionView from "./home/products/collection-view";
import FilterLayoutView from "./home/filters/layout-view";

export default Marionette.LayoutView.extend({

    template: layoutTemplate,

    initialize(options){
        this.collection = options.collection;
    },

    regions:{
        products: "#products",
        filters: "#filters"
    },

    onAttach: function() {
      var productsView = new ProductCollectionView({
        collection: this.collection.clone()
      });

      var filterLayoutView = new FilterLayoutView({
        products: this.collection
      });

      this.listenTo(filterLayoutView, 'handle:search', productsView.triggerMethod.bind(productsView, 'handle:search'));

      this.products.show(productsView);
      this.filters.show(filterLayoutView);
    }
});
