"use strict";
import Marionette from "backbone.marionette";
import templateElem from "./templateElem.hbs";





export var ViewDetails= Marionette.ItemView.extend({
    template: templateElem,
    serializeElement(){
        return this.model
    }
})
