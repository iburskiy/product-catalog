"use strict";
import {Model} from "./model";
import Backbone from "backbone";

export var Collection= Backbone.Collection.extend({
    model: Model
});
