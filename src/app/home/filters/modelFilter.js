"use strict";

import Backbone from "backbone";

export var ModelFilter = Backbone.Model.extend({
    defaults:{
        id              :null,
        name            :null,
        type            :null,
        nameFilter      :null
    }
});
