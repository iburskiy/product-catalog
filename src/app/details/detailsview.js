"use strict";
import Marionette from "backbone.marionette";
import templateDetails from "./templateDetails.hbs";
import {Router} from "../router";

export var ViewDetails= Marionette.ItemView.extend({
    template: templateDetails
})
