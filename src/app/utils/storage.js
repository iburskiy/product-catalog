"use strict";
import Backbone from "backbone";

/**
 * filterState is just a collection FilterModels
 * filterSpecial is collection with models like:
 * {type: "cpu", names: ["Intel Core 5", "Intel Core 6"]}, {type: "date", names: ["2016", "2017"]}
 */
export default Storage = {
  filtersState: new Backbone.Collection(),
  filtersSpecial: new Backbone.Collection(),
  search: ""
};