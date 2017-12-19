"use strict";
import _ from "underscore";
import Backbone from "backbone";
import Marionette from "backbone.marionette";
import layoutTemplate from "./layout-template.hbs";
import ProductLayoutView from "./home/products/layout-view";
import FilterLayoutView from "./home/filters/layout-view";

export default Marionette.LayoutView.extend({

    template: layoutTemplate,

    initialize(options){
        this.products = options.products;
        this.filterFields = options.filterFields;
    },

    regions:{
        productsRegion: "#products",
        filtersRegion: "#filters"
    },

    onAttach: function() {
      var productsView = new ProductLayoutView({
        products: this.products.clone()
      });

      var filterLayoutView = new FilterLayoutView({
        products: this.products,
        filterFields: this.filterFields
      });

      this.listenTo(filterLayoutView, 'handle:search', productsView.triggerMethod.bind(productsView, 'handle:search'));

      this.productsRegion.show(productsView);
      this.filtersRegion.show(filterLayoutView);
    }
});
