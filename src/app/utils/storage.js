"use strict";
import Backbone from "backbone";

/**
 * filterState is just a collection of FilterModels
 * search stores the value from Search Input
 */
export default Storage = {
  filtersState: null,
  search: "",

  initFiltersState: function(filterFields) {
    this.filtersState = new Backbone.Model();
    for (var i = 0; i < filterFields.length; i++) {
      this.filtersState.set(filterFields[i], new Backbone.Collection());
    }
  }
};