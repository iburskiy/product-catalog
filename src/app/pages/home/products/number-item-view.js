"use strict";
import Backbone from "backbone";
import Marionette from "backbone.marionette";
import template from "./number-item-template.hbs";
import Storage from "../../../utils/storage";

export default Marionette.ItemView.extend({
  template: template,

  initialize: function(options) {
    this.products = options.products;
    this.model = new Backbone.Model({productsNumber: this.products.length})
  },

  onAttach: function() {
    this.listenTo(Storage.filtersState, 'change', function() {
      this.updateProductsNumber();
    }.bind(this));
  },

  updateProductsNumber: function() {
    this.model.set('productsNumber', this.products.length);
    this.render();
  }
});
