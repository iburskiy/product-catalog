"use strict";
import _ from "underscore";
import Marionette from "backbone.marionette";
import templateHome from "./templateHome.hbs";
import notebook from "!json!../../static/json/notebook.json";
import {Collection} from "../collection";

export var LayoutView = Marionette.LayoutView.extend({
    collection1: new Collection(notebook.itemList),
    collFilterCpu: new Collection(),
    initialize(){
        this.collFilterDate=this.collection1.clone();
    },
    ui: {
        "filterElem": ".filter",
        "search":"#text-search"
    },
    events: {
        "change @ui.filterElem": "filter",
        "change @ui.search": "filter"
    },
    regions:{
        view: "#view",
    },
    filter: function () {
        this.collFilterCpu.reset();
        this.collFilterDate.reset(this.collection1.models);
        var mass=_.filter(this.ui.filterElem, function (value) {
            return value.checked;
        });
        var a=[];
        if(this.ui.search.val()!==""){
            a.push({manufacturer:this.ui.search.val()})
        }
        _.each(mass, function (value) {
            a.push({[value.attributes[3].value]: value.attributes[4].value});
        });
        for(var i=0;i<a.length;i++) {
            if(i>0&&(Object.keys(a[i])[0]!==Object.keys(a[i-1])[0])) {
                this.collFilterDate.reset(this.collFilterCpu.models);
                this.collFilterCpu.reset();
            }
            this.collFilterCpu.add(this.collFilterDate.where({[Object.keys(a[i])]: +a[i][Object.keys(a[i])]||a[i][Object.keys(a[i])]}));
        }
        if(i>0) {
            this.collFilterDate.reset(this.collFilterCpu.models);
        } else{
            this.collFilterDate.reset(this.collection1.models)
        }
    },
    getCollection: function () {
        return this.collFilterDate;
    },
    template: templateHome
});
