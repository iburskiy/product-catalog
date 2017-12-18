"use strict";
import Backbone from "backbone";

/**
 * filterState is just a collection of FilterModels
 * filterSpecial is collection with models like:
 * {type: "cpu", names: ["Intel Core 5", "Intel Core 6"]}, {type: "date", names: ["2016", "2017"]}
 */
export default Storage = {
  filtersState: null,
  filtersSpecial: new Backbone.Collection(),
  search: "",

  initFiltersState: function(filterFields) {
    this.filtersState = new Backbone.Model();
    for (var i = 0; i < filterFields.length; i++) {
      this.filtersState.set(filterFields[i], new Backbone.Collection());
    }
  }
};