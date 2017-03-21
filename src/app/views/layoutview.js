"use strict";
import _ from "underscore";
import Marionette from "backbone.marionette";
import templateHome from "./templateHome.hbs";
import {Collection} from "../collection";
import {CollectionFilter} from "../collectionFilter";
import {ModelFilter} from "../modelFilter";
import {collectionElem} from "../router";
import {Storage, saveCollection, saveSearch} from "../storage";

export var LayoutView = Marionette.LayoutView.extend({
    collFilterAdditional: new Collection(),
    collectionFilter: new CollectionFilter(),
    initialize(){
        this.initialCollection=collectionElem.clone();
        this.counter = 1;
        this.collFilterResult = this.initialCollection.clone();
        this.filtersChecked = Storage;
        this.searchText  = saveSearch;
        this.elementsForSearch = this._searchSetting();
        console.log(this.searchText)
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
        this.collFilterResult.reset(this.initialCollection.models);
        this._addMassFilter();
        this._sortCollectionFilter();
        this._resetCollection();
        this._saveData();
    },
    _addMassFilter: function () {
        this.filtersChecked=[];
        _.each(this.ui.filterCheckbox.filter(":checked"), function(btn){
            this.filtersChecked.push({[btn.name]: btn.value});
        }.bind(this));

    },
    _sortCollectionFilter: function () {
        if(this.ui.search.val()!==""){
            this.collFilterResult.reset();
            _.each(this._search(this.ui.search.val()),function (number) {
                this.collFilterResult.add(this.initialCollection.models[number])
            },this);
            this.searchText.paramSearch = this.ui.search.val();
        }
        var a = this.filtersChecked;
        for(var i =0; i<a.length; i++) {
            if(i>0&&(Object.keys(a[i])[0]!==Object.keys(a[i-1])[0])) {
                this.collFilterResult.reset(this.collFilterAdditional.models);
                this.collFilterAdditional.reset();
            }
            var nameTypeFilterAndSearch=Object.keys(a[i]);
            this.collFilterAdditional.add(this.collFilterResult.where({[nameTypeFilterAndSearch]:a[i][nameTypeFilterAndSearch]}));
        }
    },
    _resetCollection: function () {
        if(this.filtersChecked.length>0) {
            this.collFilterResult.reset(this.collFilterAdditional.models);
        }else if(this.filtersChecked.length===0&&this.searchText.paramSearch==undefined){
            this.collFilterResult.reset(this.initialCollection.models);
        }
    },
    getCollection: function () {
        if(saveCollection.length) {
            return saveCollection
        }else {
            return this.collFilterResult;
        }
    },
    testFilter: function () {
        if(this.searchText.paramSearch!== undefined){
            this.ui.search[0].value =this.searchText.paramSearch;
        }
        if(this.filtersChecked.length>0){
            var i=0;
            var self = this.filtersChecked;
            for(i ; i<this.filtersChecked.length; i++ ){
                (_.find(this.ui.filterCheckbox, function (value) {
                    return value.value==self[i][Object.keys(self[i])]
                })).checked="checked";
            }
        }
    },
    _addFilter:function (type) {
        if(this.collectionFilter.length!==0){
            return;
        }
        _.each(type, function (type1) {
            var massModels = [];
            var a = _.uniq(_.pluck(_.map(this.initialCollection.models, function (value) {
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
        let filterInput = this.filters.el.firstChild.firstChild;
        for (let i = 0; i<this.collectionFilter.length; i++){
            this.ui.filterCheckbox.push(filterInput.firstChild);
            filterInput = filterInput.nextSibling;
        }
    },
    _searchSetting: function () {
        var a=[];
        _.each(["manufacturer", "model"], function (type) {
            a.push(_.pluck(_.map(this.collFilterResult.models, function (value) {
                return value.attributes
            }),type));
        },this);
        var b = [];
        for(var i=0;i<a[0].length; i++){
            b.push((a[0][i]+" "+a[1][i]).toLowerCase());
        }
        return b;
    },
    _search: function (paramSearch) {
        var index = [];
        for(var i = 0; i < this.elementsForSearch.length; i++){
            if(this.elementsForSearch[i].indexOf(paramSearch.toLowerCase())!==-1){
                index.push(i);
            }
        }
        return index;
    },
    _saveData: function () {
        saveCollection.reset(this.collFilterResult.models);
        saveSearch.paramSearch = this.searchText.paramSearch;
        Storage.splice(0, Storage.length);
        _.each(this.filtersChecked, function (array) {
            Storage.push(array);
        })
    },
    template: templateHome
});
