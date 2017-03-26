"use strict";
import _ from "underscore";
import Marionette from "backbone.marionette";
import FilterView from "./item-view";
import FilterModel from "../../../entities/filter-model";
import Storage from "../../../utils/storage";

export default Marionette.CollectionView.extend({
    tagName: "ul",

    childView: FilterView,

    ui: {
      searchInput: "#text-search"
    },

    childEvents: {
      'filter:changed': 'onFilterChanged'
    },

    initialize: function(options) {
      this.products = options.products;
      this.collection = options.collection;
    },

    onBeforeRender: function() {
      this._addFilter(["cpu", "date", "color", "diagonal", "os"]);
    },

    _addFilter:function (type) {
      var counter = 1;
      if(this.collection.length!==0){
        return;
      }
      _.each(type, function (type1) {
        var massModels = [];
        var a = _.uniq(_.pluck(_.map(this.products.models, function (value) {
          return value.attributes
        }), type1));
        if(!a[0]){
          return;
        }
        massModels.push(new FilterModel({nameFilter: type1}));
        for(var key in a) {
          massModels.push(new FilterModel({id: counter, type: type1, name: a[key]}));
          counter++;
        }
        this.collection.add(massModels);
      },this);
    },

    onFilterChanged: function(childview, id) {
      var selectedModel = this.collection.get(id);
      if (Storage.filtersState.findWhere({'id': id})) {
        Storage.filtersState.remove(selectedModel);
      } else {
        Storage.filtersState.add(selectedModel);
      }
    }
});
