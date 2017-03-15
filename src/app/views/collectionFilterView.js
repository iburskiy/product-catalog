"use strict";
import _ from "underscore";
import Marionette from "backbone.marionette";
import {FilterView} from "./filterView";
import {CollectionFilter} from "../collectionFilter";
import {ModelFilter} from "../modelFilter";
import {collectionElem} from "../router";




export var CollectionFilterView = Marionette.CollectionView.extend({
    tagName: "ul",
    childView: FilterView,
});
