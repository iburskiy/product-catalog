"use strict";
import _ from "underscore";
import Marionette from "backbone.marionette";
import {LayoutView} from "./views/layoutview";
import {Region} from "./regions";
import {ViewDetails} from "./details/detailsview";
import notebook from "!json!../static/json/notebook.json";
import Backbone from 'backbone';

export var collectionElem = new Backbone.Collection(notebook.itemList);

export let Router = Marionette.AppRouter.extend({
    initialize(){
        this.region = new Region();
    },
    routes: {
        "": "home",
        "about/:notebook/*product": "about"
    },
    home() {
        var view = new LayoutView();
        this.region.get("content").show(view);
    },

    about (query, product) {
        var detailsView = new ViewDetails({
          model: collectionElem.findWhere({href: product})
        });
        this.region.get("content").show(detailsView);
    },
});
