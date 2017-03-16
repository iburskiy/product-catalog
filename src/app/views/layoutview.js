"use strict";
import _ from "underscore";
import Marionette from "backbone.marionette";
import templateHome from "./templateHome.hbs";
import {Collection} from "../collection";
import {CollectionFilter} from "../collectionFilter";
import {ModelFilter} from "../modelFilter";
import {collectionElem} from "../router";

export var LayoutView = Marionette.LayoutView.extend({
    collFilterAdditional: new Collection(),
    collectionFilter: new CollectionFilter(),
    initialize(){
        this.collection1=collectionElem.clone();
        this.counter = 1;
        this.collFilterResult=this.collection1.clone();
        this.filtersChecked=[];
    },
    ui: {
        filterCheckbox: ".filter",
        search: "#text-search"
    },
    events: {
        "change @ui.filterCheckbox": "filter",
        "change @ui.search": "filter"
    },
    regions:{
        view: "#view",
        filters: "#filter"
    },
    filter: function () {
        this.collFilterAdditional.reset();
        this.collFilterResult.reset(this.collection1.models);
        this._addMassFilter();
        this._sortCollectionFilter();
        this._resetCollection();
    },
    _addMassFilter: function () {
        this.filtersChecked=[];
        if(this.ui.search.val()!==""){
            this.filtersChecked.push({manufacturer:this.ui.search.val()})
        }
        _.each(this.ui.filterCheckbox.filter(":checked"), function(btn){
            this.filtersChecked.push({[btn.name]: btn.value});
        }.bind(this));

    },
    _sortCollectionFilter: function () {
        var a = this.filtersChecked;
        for(var i=0;i<a.length;i++) {
            if(i>0&&(Object.keys(a[i])[0]!==Object.keys(a[i-1])[0])) {
                this.collFilterResult.reset(this.collFilterAdditional.models);
                this.collFilterAdditional.reset();
            }
            var nameTypeFilter=Object.keys(a[i]);
            this.collFilterAdditional.add(this.collFilterResult.where({[nameTypeFilter]:a[i][nameTypeFilter]}));
        }
    },
    _resetCollection: function () {
        if(this.filtersChecked.length>0) {
            this.collFilterResult.reset(this.collFilterAdditional.models);
        } else{
            this.collFilterResult.reset(this.collection1.models)
        }
    },
    getCollection: function () {
        return this.collFilterResult;
    },
    testFilter: function () {
        if(this.filtersChecked.length>0){
            var i=0;
            if([Object.keys(this.filtersChecked[0])][0]=="manufacturer"){
                this.ui.search[0].value =this.filtersChecked[0][Object.keys(this.filtersChecked[0])];
                i++;
            }
            var self = this.filtersChecked;
            for(i ; i<this.filtersChecked.length; i++ ){
                (_.find(this.ui.filterCheckbox, function (value) {
                    return value.value==self[i][Object.keys(self[i])]
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
            if(!a[0]){
                return;
            }
            massModels.push(new ModelFilter({nameFilter: type1}));
            for(var key in a) {
                massModels.push(new ModelFilter({id: this.counter, type: type1, name: a[key]}));
                this.counter++;
            }
            this.collectionFilter.add(massModels);
        },this);
    },
    _addUiFilterElement: function () {
        let filterInput = this.filters.el.firstChild.firstChild
        for (let i = 0; i<this.collectionFilter.length; i++){
            this.ui.filterCheckbox.push(filterInput.firstChild);
            filterInput = filterInput.nextSibling;
        }
    },
    template: templateHome
});
