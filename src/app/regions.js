/**
 * Created by Александр on 01.03.2017.
 */
"use strict";
import Marionette from "backbone.marionette";

export var Region = Marionette.RegionManager.extend({
    regions:{
        content: "#content",
        details: "#details"
    },
});