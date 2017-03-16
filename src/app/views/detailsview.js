"use strict";
import Marionette from "backbone.marionette";
import templateDetails from "./templateDetails.hbs";





export var ViewDetails= Marionette.ItemView.extend({
    ui:{
        "fullImg": ".full-img",
        "miniImg": ".mini-img"
    },
    events:{
        "click @ui.miniImg": "openImg",
    },
    template: templateDetails,
    serializeElement(){
        return this.model
    }
})
