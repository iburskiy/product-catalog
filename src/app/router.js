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

export var collectionElem = new Collection(notebook.itemList);


export let Router = Marionette.AppRouter.extend({
    initialize(){
        this.region = new Region();
    },
    routes: {
        "": "home",
        "about/:notebook/*w": "about",
    },
    home() {
        var view = new LayoutView();
        view._addFilter(["cpu", "date", "color", "diagonal", "os"]);
        this.region.get("content").show(view);
        var helloView = new CollectionView({collection:view.getCollection()});
        var filter = new CollectionFilterView({collection: view.collectionFilter});
        view.getRegion("view").show(helloView);
        view.getRegion("filters").show(filter);
        view._addUiFilterElement();
        view.testFilter();
        window.scrollTo(0, 0);
    },

    about (query, w) {
        var detailsView = new ViewDetails();
        var mass = collectionElem.where({href: w});
        detailsView.model=mass[0];
        this.region.get("content").show(detailsView);
        window.scrollTo(0, 0);
    },
});
