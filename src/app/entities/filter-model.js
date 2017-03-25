"use strict";

import Backbone from "backbone";

export default Backbone.Model.extend({
    defaults:{
        id              :null,
        name            :null,
        type            :null,
        nameFilter      :null
    }
});
