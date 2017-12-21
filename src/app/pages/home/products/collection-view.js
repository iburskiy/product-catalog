"use strict";
import _ from "underscore";
import Marionette from "backbone.marionette";
import ProductView from "./item-view";
import Storage from "../../../utils/storage";
import {cloneDeep} from "lodash";

export default Marionette.CollectionView.extend({
    childView: ProductView,

    initialize: function(options) {
      this.collection = options.collection;
      this.collectionDefault = this.collection.clone();
      this.listenTo(Storage.filtersState, "change", this.filterProducts);
    },

    filterProducts: function() {
        var result = this._filterByFields(Storage.filtersState, this.collectionDefault.models);
        if (Storage.search) {
          result = this._filterBySearch(result, Storage.search);
        }
        this.collection.reset(result);

        this.trigger('filter:products');
    },

    _filterByFields: function(filters, collection) {
      var type;
      var attrs = filters.attributes;
      if (!collection.length) {
        return [];
      }

      var keysArray = Object.keys(attrs);
      var filterCollection;
      for (var i = 0; i < keysArray.length; i++) {
        type = keysArray[i];
        filterCollection = attrs[type];
        if (filterCollection.length) {
          collection = _.filter(collection, function(item) {
            return filterCollection.findWhere({'name': item.get(type)});
          });
        }
      }

      return collection;
    },

    _filterBySearch: function(collection, search) {
      return collection.filter(function(model){
        return (model.get("manufacturer") + " " + model.get("model")).match(new RegExp(search, 'i'));
      });
    },

    onAttach: function() {
      this.filterProducts();
    },

    handleSearch: function(search) {
      Storage.search = search;
      this.filterProducts();
    }
});

