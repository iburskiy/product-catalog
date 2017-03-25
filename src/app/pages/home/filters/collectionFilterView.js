"use strict";
import Marionette from "backbone.marionette";
import {FilterView} from "./filterView";

export var CollectionFilterView = Marionette.CollectionView.extend({
    tagName: "ul",
    childView: FilterView
});
