"use strict";
import Marionette from "backbone.marionette";
import {CollectionView} from "./views/collectionview";
import {LayoutView} from "./views/layoutview";
import {Region} from "./regions";
import {ViewDetails} from "./views/detailsview";
import notebook from "!json!../static/json/notebook.json";
import {Collection} from "./collection";


export default Marionette.AppRouter.extend({
  initialize(){
      this.layout=new LayoutView();
      this.collection= new Collection(notebook.itemList);

  },
  routes: {
    "": "home",
    "about/:query/*w": "about"
  },
  home() {
      var region=new Region();
      region.get("content").show(this.layout);
      this.layout.testFilter();
      var helloView = new CollectionView({collection: this.layout.getCollection()});
      this.layout.getRegion("view").show(helloView);
      window.scrollTo(0, 0);
  },

  about ( query, w) {
      var region=new Region();
      var mass = this.collection.where({href: w});
      var Details = new ViewDetails({model: mass[0]});
      region.get("content").show(Details);
      window.scrollTo(0, 0);
  },
});
