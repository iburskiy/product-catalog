"use strict";
import Marionette from "backbone.marionette";
import LayoutView from "./pages/layout-view";
import {Region} from "./regions";
import DetailsView from "./pages/details/view";
import data from "!json!../static/json/notebook.json";
import Backbone from 'backbone';
import Storage from './utils/storage';

export var products = new Backbone.Collection(data.productList);

export let Router = Marionette.AppRouter.extend({
    initialize(){
        this.region = new Region();
        Storage.initFiltersState(data.filterFields);
    },
    routes: {
        "": "home",
        "about/:notebook/*product": "about"
    },
    home() {
        var view = new LayoutView({products: products, filterFields: data.filterFields});
        this.region.get("content").show(view);
    },
    about (query, product) {
        var detailsView = new DetailsView({
          model: products.findWhere({href: product})
        });
        this.region.get("content").show(detailsView);
    },
});
