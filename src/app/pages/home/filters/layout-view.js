"use strict";
import Marionette from "backbone.marionette";
import FilterCollection from "../../../entities/filter-collection";
import template from "./layout-template.hbs";
import Storage from "../../../utils/storage";
import FilterCompositeView from "./composite-view";
import FilterModel from "../../../entities/filter-model";
import $ from "jquery";

export default Marionette.LayoutView.extend({

  template: template,

  ui: {
    searchInput: '#search'
  },

  events: {
    'submit form': 'handleSearch'
  },

  initialize: function(options) {
    this.products = options.products;
    this.filterFields = options.filterFields;
  },

  onBeforeAttach: function() {
    if (Storage.search) {
      this.ui.searchInput.val(Storage.search);
    }
  },

  onAttach: function() {
    var counter = 1;
    var $filterViewBlock;

    var filters = this._prepareFilters(this.products, this.filterFields);

    /* Preparing DOM for filters dynamically depending on the number of filterFields in JSON:
     <div class="filters-container">
      <div class="filter-list1"></div>
      <div class="filter-list2"></div>
     </div>
      Each block filter-list1 dynamically becomes a region filled with FilterCompositeView
     */
    for (var type in filters) {
      if (filters.hasOwnProperty(type)) {
        $filterViewBlock = $('<div class="filter-list' + counter + '"></div>');
        this.$el.find('.filters-container').append($filterViewBlock);
        this.addRegion("filterList" + counter, ".filter-list" + counter);
        this["filterList" + counter].show(new FilterCompositeView({
          collection: filters[type],
          model: new Backbone.Model({
            filterField: type
          })
        }));
        counter++;
      }
    }
  },

  /*
    Prepare result as {'cpu': FilterCollection, 'date': FilterCollection, ...} depending on filterFields in JSON
   */
  _prepareFilters: function(products, filterFields) {
    var result = {};
    var filterField;
    var filterCollection;
    // prepare object with empty collections: {'cpu': empty FilterCollection, 'date': empty FilterCollection, ...}
    for(var i = 0; i < filterFields.length; i++) {
      result[filterFields[i]] = new FilterCollection();
    }
    products.each(function(model) {
      for(var i = 0; i < filterFields.length; i++) {
        filterField = filterFields[i];
        filterCollection = result[filterField];
        if (!filterCollection.findWhere({
            "name": model.get(filterField)
          })) {
          result[filterField].add(new FilterModel({'type': filterField, 'name': model.get(filterField)}))
        }
      }
    }.bind(this));

    return result;
  },

  handleSearch: function(event) {
    event.preventDefault();
    this.trigger('handle:search', this.ui.searchInput.val());
  }
});