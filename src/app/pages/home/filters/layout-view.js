"use strict";
import Marionette from "backbone.marionette";
import FilterCollectionView from "./collection-view";
import FilterCollection from "../../../entities/filter-collection";
import template from "./layout-template.hbs";
import Storage from "../../../utils/storage";

export default Marionette.LayoutView.extend({

  template: template,

  regions: {
    filterList: '.filter-list'
  },

  ui: {
    searchInput: '#search'
  },

  events: {
    'submit form': 'handleSearch'
  },

  initialize: function(options) {
    this.products = options.products;
  },

  onBeforeAttach: function() {
    if (Storage.search) {
      this.ui.searchInput.val(Storage.search);
    }
  },

  onAttach: function() {
    var filtersView = new FilterCollectionView({
      collection: new FilterCollection(),
      products: this.products
    });
    this.filterList.show(filtersView);
  },

  handleSearch: function(event) {
    event.preventDefault();
    this.trigger('handle:search', this.ui.searchInput.val());
  }
});