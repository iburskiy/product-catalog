/**
 * Created by Александр on 27.02.2017.
 */
import _ from "underscore";
import Marionette from "backbone.marionette";
import template from "./template.hbs";
import templateName from "./template-name.hbs";
import Storage from "../../../utils/storage";

export default Marionette.ItemView.extend({
    template: template,
    tagName: "li",

    events: {
        'change input[type=checkbox]': 'onChange'
    },

    initialize(){
         if(this.model.get('nameFilter')){
            this.template=templateName;
         }
    },

    onChange: function() {
      this._updateFiltersSpecial();
      this.trigger('filter:changed', this.model.get('id'));
    },

  /**
   * Keeps updated Storage.filtersSpecial while adding/removing a filter
   * @private
   */
    _updateFiltersSpecial: function() {
      var filterType = this.model.get("type");
      var filterName = this.model.get("name");

      var searchResult = Storage.filtersSpecial.findWhere({type: filterType});
      if (!searchResult) {
        Storage.filtersSpecial.add(new Backbone.Model({
          type: filterType,
          names: [filterName]
        }))
      } else if (!_.contains(searchResult.get("names"), filterName)) {
        // The clone() call ensures we get a new array reference - and change event will be called on "set"
        var namesArr = _.clone(searchResult.get("names"));
        namesArr.push(filterName);
        searchResult.set("names", namesArr);
      } else {
        var filteredNames = _.filter(searchResult.get("names"), function(item) {
          return item !== filterName;
        });

        if (filteredNames.length) {
          searchResult.set("names", filteredNames);
        } else {
          Storage.filtersSpecial.remove(searchResult);
        }
      }
    },

    onAttach: function() {
      // set filter checkboxes
      var id = this.model.get('id');
      if (Storage.filtersState.findWhere({'id': id})) {
        this.$el.find('input').prop('checked', true);
      }
    }
});
