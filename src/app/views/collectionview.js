"use strict";

import Marionette from "backbone.marionette";
import {MyView} from "./view";




export var CollectionView=Marionette.CollectionView.extend({
    childView: MyView
});

