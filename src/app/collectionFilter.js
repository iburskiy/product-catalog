"use strict";
import {ModelFilter} from "./modelFilter";
import Backbone from "backbone";

export var CollectionFilter = Backbone.Collection.extend({
    model: ModelFilter
});

