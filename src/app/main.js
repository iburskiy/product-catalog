"use strict";
import Marionette from "backbone.marionette";
import Backbone from "backbone";
import Router from "./router";

export var App = new Marionette.Application();

App.addRegions({
    content: "#content"
});

App.addInitializer(function () {
    const router = new Router();
    Backbone.history.start();
});
App.start();






