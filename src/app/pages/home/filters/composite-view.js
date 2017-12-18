"use strict";
import Marionette from "backbone.marionette";
import FilterView from "./item-view";
import template from "./composite-template.hbs";

export default Marionette.CompositeView.extend({
  template: template,
  childView: FilterView,
  childViewContainer: 'ul',

  initialize: function(options) {
    this.collection = options.collection;
    this.model = options.model;
  }
});
