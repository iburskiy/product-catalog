"use strict";
import Backbone from "backbone";
import Marionette from "backbone.marionette";
import template from "./layout-template.hbs";
import ItemView from "./item-view";

export default Marionette.LayoutView.extend({
    template: template,

    regions: {
      detailsRegion: ".details",
    },

    initialize: function(options) {
      this.model = options.model;
      this.productListLabels = options.productListLabels;
    },

    onAttach: function() {
      var itemView = new ItemView({
        model: this._prepareModel()
      });
      this.detailsRegion.show(itemView);
    },

    _prepareModel: function() {
        var productDetails = [];
        for(var attr in this.model.attributes){
          if (this.productListLabels[attr]) {
            productDetails.push({label: this.productListLabels[attr], value: this.model.get(attr)})
          }
        }
        return new Backbone.Model({productDetails: productDetails});
    }
})
