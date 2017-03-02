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
    openImg: function () {
        if(this.ui.fullImg[0].style.display=="none") {
            this.ui.fullImg[0].style.display = "block";
        }else{
            this.ui.fullImg[0].style.display = "none"
        }
    },
    template: templateElem,
    serializeElement(){
        return this.model
    }
})
