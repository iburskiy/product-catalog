"use strict";
import $ from "jquery";
import _ from "underscore";
import Marionette from "backbone.marionette";
import templateHome from "./templateHome.hbs";
import notebook from "!json!../../static/json/notebook.json";
import {Collection} from "../collection";
var collection1 = new Collection(notebook.itemList);
export var collection = collection1.clone();
var collFilterCpu= collection1.clone();
var collFilterDate= collection1.clone();
var collFilterDiagonal= collection1.clone();
var collSearch;

export var LayoutView = Marionette.LayoutView.extend({
    ui: {
        "filterCpu": ".filter-cpu",
        "filterDate": ".filter-date",
        "filterDiagonal": ".filter-diagonal",
        "search":"#text-search"
    },
    events: {
        "change @ui.filterCpu": "filterCpu",
        "change @ui.filterDate": "filterDate",
        "change @ui.filterDiagonal": "filterDiagonal",
        "change @ui.search":"searchItem"
    },
    filterCpu: function () {
        for(var i=0; i<this.ui.filterCpu.length;i++){
            var select=this.ui.filterCpu[i].attributes[4].value;
            var a =_.filter(collection1.models, function (value) {
                return value.attributes.cpu==select;
            });
            if (this.ui.filterCpu[i].checked){
                collFilterCpu.add(a);
            }else{
                collFilterCpu.remove(a)
            }
        }
        if(collFilterCpu.length==0){
            collFilterCpu.reset(collection1.models)
        }
        var final= _.intersection(collFilterCpu.models, collFilterDate.models, collFilterDiagonal.models, collSearch);
        collection.reset(final);
    },
    filterDate: function () {
        for(var i=0; i<this.ui.filterDate.length;i++){
            var select=this.ui.filterDate[i].attributes[4].value;
            var a =_.filter(collection1.models, function (value) {
                return value.attributes.date==select;
            });
            if (this.ui.filterDate[i].checked){
                collFilterDate.add(a);
            }else{
                collFilterDate.remove(a)
            }
        }
        if(collFilterDate.length==0){
            collFilterDate.reset(collection1.models)
        }
        var final= _.intersection(collFilterCpu.models, collFilterDate.models, collFilterDiagonal.models, collSearch);
        collection.reset(final);
    },
    filterDiagonal: function () {
        for(var i=0; i<this.ui.filterDiagonal.length;i++){
            var select=this.ui.filterDiagonal[i].attributes[4].value;
            var a =_.filter(collection1.models, function (value) {
                return value.attributes.diagonal==select;
            });
            if (this.ui.filterDiagonal[i].checked){
                collFilterDiagonal.add(a);
            }else{
                collFilterDiagonal.remove(a)
            }
        }
        if(collFilterDiagonal.length==0){
            collFilterDiagonal.reset(collection1.models)
        }
        var final= _.intersection(collFilterCpu.models, collFilterDate.models, collFilterDiagonal.models, collSearch);
        collection.reset(final);
    },
    searchItem: function () {
        var mass;
        if(this.ui.search.val()==""){
            collSearch=collection1.models;
        }else{
            collSearch=collection1.where({manufacturer : this.ui.search.val()});
        }
        var final= _.intersection(collFilterCpu.models, collFilterDate.models, collFilterDiagonal.models, collSearch);
        collection.reset(final);
    },
    template: templateHome
});
