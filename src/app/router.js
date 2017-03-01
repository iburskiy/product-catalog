"use strict";

import Backbone from "backbone";
import {CollectionView} from "./views/collectionview";
import {LayoutView} from "./views/layoutview";
import {Region} from "./regions";

import {ViewDetails} from "./views/detailsview";

export default Backbone.Router.extend({
  initialize(){
      this.layout=new LayoutView();
  },
  routes: {
    "": "home",
    "about/:query/*w": "about"
  },
  home() {
      var region = new Region();
      region.show(this.layout);
      var helloView = new CollectionView({collection: this.layout.getCollection()});
      this.layout.getRegion("view").show(helloView);
  },

  about ( query, w) {
      var region = new Region();
      var mass = this.layout.getCollection().where({href: w});
      var Details = new ViewDetails({model: mass[0]});
      region.show(Details);
  },
});
