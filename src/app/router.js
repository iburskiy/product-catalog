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
      this.collectionElem= new Collection(notebook.itemList);
      this.details = new ViewDetails();
  },
  routes: {
    "": "home",
    "about/:query/*w": "about"
  },
  home() {
      var region=new Region();
      region.get("content").show(this.layout);
      var helloView = new CollectionView({collection:this.layout.getCollection()});
      this.layout.testFilter();
      this.layout.getRegion("view").show(helloView);
      window.scrollTo(0, 0);
  },

  about ( query, w) {
      var region=new Region();
      var mass = this.collectionElem.where({href: w});
      this.details.model=mass[0];
      region.get("content").show(this.details);
      window.scrollTo(0, 0);
  },
});
