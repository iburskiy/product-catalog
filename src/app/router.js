"use strict";

import $ from "jquery";
import Backbone from "backbone";
import {CollectionView} from "./views/collectionview";
import {LayoutView, collection} from "./views/layoutview";
import {MyView} from "./views/view";
import template from "./views/templateElem.hbs";


export default Backbone.Router.extend({
  routes: {
    "": "home",
    "about/:query/*w": "about"
  },

  home() {
      var layout = new LayoutView().render();
      $("#content").empty().append(layout.$el);
      var helloView = new CollectionView({collection: collection}).render();
      $("#view").empty().append(helloView.$el);
  },

  about ( query, w) {
      var mass = collection.where({href: w});
      var Details = new MyView({template: template, model: mass[0]}
      ).render();
      $("#content").empty().append(Details.$el);
      window.scrollTo(0, 0);
  },
});
