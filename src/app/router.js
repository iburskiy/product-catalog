"use strict";
import _ from "underscore";
import Marionette from "backbone.marionette";
import {CollectionView} from "./views/collectionview";
import {LayoutView} from "./views/layoutview";
import {Region} from "./regions";
import {ViewDetails} from "./views/detailsview";
import notebook from "!json!../static/json/notebook.json";
import {Collection} from "./collection";
import {CollectionFilterView} from "./views/collectionFilterView";

export let collectionElem = new Collection(notebook.itemList);


export let Router = Marionette.AppRouter.extend({
    initialize(){
        this.layout = new LayoutView();
        this.layout._addFilter(["cpu", "date", "color", "diagonal", "os"]);
        this.route("", "home", this.home());
    },
    routes: {
        "home": "home",
        "about/:notebook/*w": "about",
    },
    home() {
        this.navigate("home");
        let region = new Region();
        region.get("content").show(this.layout);
        let helloView = new CollectionView({collection: this.layout.getCollection()});
        let filter = new CollectionFilterView({collection: this.layout.collectionFilter});
        this.layout.getRegion("filters").show(filter);
        this.layout._addUiFilterElement();
        this.layout.testFilter();
        this.layout.getRegion("view").show(helloView);
        window.scrollTo(0, 0);
    },

    about (query, w) {
        let region = new Region();
        this.details = new ViewDetails();
        let mass = collectionElem.where({href: w});
        this.details.model = mass[0];
        region.get("content").show(this.details);
        window.scrollTo(0, 0);
    }
});
