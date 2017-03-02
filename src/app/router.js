"use strict";

import Backbone from "backbone";
import {CollectionView} from "./views/collectionview";
import {LayoutView} from "./views/layoutview";
import {Region} from "./regions";
import {ViewDetails} from "./views/detailsview";
import notebook from "!json!../static/json/notebook.json";
import {Collection} from "./collection";


export default Backbone.Router.extend({
  initialize(){
      this.layout=new LayoutView();
      this.regions = new Region();
      this.collection= new Collection(notebook.itemList);

  },
  routes: {
    "": "home",
    "about/:query/*w": "about"
  },
  home() {
      this.regions.get("home").show(this.layout);
      var helloView = new CollectionView({collection: this.layout.getCollection()});
      this.layout.getRegion("view").show(helloView);
  },

  about ( query, w) {
      var mass = this.collection.where({href: w});
      var Details = new ViewDetails({model: mass[0]});
      this.regions.get("details").show(Details);
  },
});
