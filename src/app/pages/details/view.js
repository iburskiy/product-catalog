"use strict";
import Marionette from "backbone.marionette";
import templateDetails from "./template.hbs";
import {Router} from "../../router";

export default Marionette.ItemView.extend({
    template: templateDetails
})
