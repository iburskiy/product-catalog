"use strict";
import Marionette from "backbone.marionette";
import templateElem from "./templateElem.hbs";





export var ViewDetails= Marionette.ItemView.extend({
    ui:{
        "fullImg": ".full-img",
        "miniImg": ".mini-img"
    },
    events:{
        "click @ui.miniImg": "openImg",
    },
    template: templateElem,
    serializeElement(){
        return this.model
    }
})
