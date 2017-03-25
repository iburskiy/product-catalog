"use strict";
import _ from "underscore";
import Backbone from "backbone";
import Marionette from "backbone.marionette";
import templateHome from "./layout-template.hbs";
import FilterCollection from "./../entities/filter-collection";
import FilterModel from "./../entities/filter-model";
import {collectionElem} from "../router";
import {Storage, saveCollection, saveSearch} from "../utils/storage";
import FilterCollectionView from "./home/filters/collection-view";
import ProductCollectionView from "./home/products/collection-view";

export default Marionette.LayoutView.extend({
    collFilterAdditional: new Backbone.Collection(),
    collectionFilter: new FilterCollection(),

    template: templateHome,

    initialize(){
        this.initialCollection=collectionElem.clone();
        this.counter = 1;
        this._addFilter(["cpu", "date", "color", "diagonal", "os"]);

        this.collFilterResult = this.initialCollection.clone();
        this.filtersChecked = Storage.saveFilter;
        this.searchText  = Storage.saveSearch;
        this.elementsForSearch = this._searchSetting();
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
        console.log(Storage.saveFilter)
    },
    _addMassFilter: function () {
        this.filtersChecked=[];
        _.each(this.ui.filterCheckbox.filter(":checked"), function(btn){
            this.filtersChecked.push({name: btn.name, value: btn.value});
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
            if(i>0&&a[i].name!==a[i-1].name) {
                this.collFilterResult.reset(this.collFilterAdditional.models);
                this.collFilterAdditional.reset();
            }
            this.collFilterAdditional.add(this.collFilterResult.where({[a[i].name]:a[i].value}));
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
        if(Storage.saveCollection.length) {
            return Storage.saveCollection
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
                    return value.value==self[i].value
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
            massModels.push(new FilterModel({nameFilter: type1}));
            for(var key in a) {
                massModels.push(new FilterModel({id: this.counter, type: type1, name: a[key]}));
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
        Storage.saveCollection.reset(this.collFilterResult.models);
        Storage.saveSearch.paramSearch = this.ui.search.val();
        Storage.saveFilter=[];
        _.each(this.filtersChecked, function (array) {
            Storage.saveFilter.push(array);
        })
    },

    onRender: function() {
      var helloView = new ProductCollectionView({collection: this.getCollection()});
      var filter = new FilterCollectionView({collection: this.collectionFilter});
      this.view.show(helloView);
      this.filters.show(filter);
      this._addUiFilterElement();
      this.testFilter();
    }
});
