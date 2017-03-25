"use strict";
import Marionette from "backbone.marionette";
import ProductView from "./item-view";

export default Marionette.CollectionView.extend({
    childView: ProductView
});

