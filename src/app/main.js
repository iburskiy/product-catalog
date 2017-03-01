"use strict";
import Marionette from "backbone.marionette";
import Backbone from "backbone";
import Router from "./router";

var MyApp = new Marionette.Application();
MyApp.addRegions({
    home: "#content",
    details: "#details"
});

const router = new Router();

Backbone.history.start();




