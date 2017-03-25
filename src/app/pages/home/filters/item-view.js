/**
 * Created by Александр on 27.02.2017.
 */
import _ from "underscore";
import Marionette from "backbone.marionette";
import template from "./template.hbs";
import templateName from "./template-name.hbs";

export default Marionette.ItemView.extend({
    template: template,
    tagName: "li",
    initialize(){
         if(this.model.get('nameFilter')){
            this.template=templateName;
         }
    }
});
