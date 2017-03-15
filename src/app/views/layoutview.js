"use strict";
import _ from "underscore";
import Marionette from "backbone.marionette";
import templateHome from "./templateHome.hbs";
import notebook from "!json!../../static/json/notebook.json";
import {Collection} from "../collection";
import {CollectionFilterView} from "./collectionFilterView";
import {CollectionFilter} from "../collectionFilter";
import {ModelFilter} from "../modelFilter";

export var LayoutView = Marionette.LayoutView.extend({
    collection1: new Collection(notebook.itemList),
    collFilterCpu: new Collection(),
    collectionFilter: new CollectionFilter(),
    initialize(){
        this.counter = 1;
        this.collFilterDate=this.collection1.clone();
        this.a=[];
        this.mass=[];
    },
    ui: {
        filterElem: ".filter",
        search: "#text-search"
    },
    events: {
        "change @ui.filterElem": "filter",
        "change @ui.search": "filter"
    },
    regions:{
        view: "#view",
        filters: "#filter"
    },
    filter: function () {
        this.collFilterCpu.reset();
        this.collFilterDate.reset(this.collection1.models);
        this._addMassFilter();
        this._sortCollectionFilter();
        this._resetCollection();
        //console.log(this.collFilterDate)
    },
    _addMassFilter: function () {
        this.mass=_.filter(this.ui.filterElem, function (value) {
            return value.checked;
        });
        this.a=[];
        if(this.ui.search.val()!==""){
            this.a.push({manufacturer:this.ui.search.val()})
        }
        var a=this.a;
        _.each(this.mass, function (value) {
            a.push({[value.attributes[3].value]: value.attributes[4].value});
        });
        console.log(a)
    },
    _sortCollectionFilter: function () {
        var a = this.a;
        for(var i=0;i<a.length;i++) {
            if(i>0&&(Object.keys(a[i])[0]!==Object.keys(a[i-1])[0])) {
                this.collFilterDate.reset(this.collFilterCpu.models);
                this.collFilterCpu.reset();
            }
            this.collFilterCpu.add(this.collFilterDate.where({[Object.keys(a[i])]: +a[i][Object.keys(a[i])]||a[i][Object.keys(a[i])]}));
        }
    },
    _resetCollection: function () {
        if(this.a.length>0) {
            this.collFilterDate.reset(this.collFilterCpu.models);
        } else{
            this.collFilterDate.reset(this.collection1.models)
        }
    },
    getCollection: function () {
        return this.collFilterDate;
    },
    testFilter: function () {
        if(this.a.length>0){
            var i=0;
            if([Object.keys(this.a[0])][0]=="manufacturer"){
                this.ui.search[0].value =this.a[0][Object.keys(this.a[0])];
                i++;
            }
            var a = this.a;
            for(i ; i<this.a.length; i++ ){
                (_.find(this.ui.filterElem, function (value) {
                    return value.value==a[i][Object.keys(a[i])]
                })).checked="checked";
            }
        }
    },
    _addFilter:function (type) {
        _.each(type, function (type1) {
            var massModels = [];
            var a = _.uniq(_.pluck(_.map(this.collection1.models, function (value) {
                return value.attributes
            }), type1));
            console.log(a);
            massModels.push(new ModelFilter({nameFilter: type1}));
            for(var key in a) {
                massModels.push(new ModelFilter({id: this.counter, type: type1, name: a[key]}));
                this.counter++;
            }
            this.collectionFilter.add(massModels);
        },this);
    },
    _addUiFilterElement: function () {
        var f = this.filters.el.firstChild.firstChild
        for (var i = 0; i<this.collectionFilter.length; i++){
            this.ui.filterElem.push(f.firstChild);
            f = f.nextSibling;
        }
    },
    template: templateHome
});
