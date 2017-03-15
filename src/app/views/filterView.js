/**
 * Created by Александр on 27.02.2017.
 */
import _ from "underscore";
import Marionette from "backbone.marionette";
import template from "./templatefilter.hbs";
import templateName from "./templateFilterName.hbs";

export var FilterView = Marionette.ItemView.extend({
    template: template,
    tagName: "li",
    initialize(){
         if(this.options.model.attributes.nameFilter!==null){
         this.template=templateName;
         }
    },
    serializeCollection(){
        return this.model
    }
});