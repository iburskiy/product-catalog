"use strict";
import _ from "underscore";
import Marionette from "backbone.marionette";
import ProductView from "./item-view";
import Storage from "../../../utils/storage";

export default Marionette.CollectionView.extend({
    childView: ProductView,

    initialize: function(options) {
        this.collection = options.collection;
        this.listenTo(Storage.filtersSpecial, "add remove change reset", this.filterProducts);
        this.collectionDefault = this.collection.clone();
    },

    filterProducts: function() {
        function filterIteration(filters, collection) {
          if (!collection.length) {
            return [];
          }
          if (!filters.length) {
            return collection;
          }
          var firstFilter = filters.shift();
          var type = firstFilter.get("type");
          var names = firstFilter.get("names");
          collection = _.filter(collection, function(item) {
            return _.contains(names, item.get(type));
          });
          return filterIteration(filters, collection);
        };

        var result = filterIteration(Storage.filtersSpecial.clone(), this.collectionDefault.models);
        if (Storage.search) {
          result = this.filterProductsBySearch(result, Storage.search);
        }
        this.collection.reset(result);
    },

    filterProductsBySearch: function(collection, search) {
      return collection.filter(function(model){
        return (model.get("manufacturer") + " " + model.get("model")).match(new RegExp(search, 'i'));
      });
    },

    onAttach: function() {
      this.filterProducts();
    },

    onHandleSearch: function(search) {
      Storage.search = search;
      this.filterProducts();
    }
});

