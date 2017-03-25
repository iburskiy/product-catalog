"use strict";
import FilterModel from "./filter-model";
import Backbone from "backbone";

export default Backbone.Collection.extend({
    model: FilterModel
});

