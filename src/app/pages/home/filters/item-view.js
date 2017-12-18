"use strict";
import Marionette from "backbone.marionette";
import template from "./item-template.hbs";
import Storage from "../../../utils/storage";

export default Marionette.ItemView.extend({
  template: template,
  tagName: "li",

  events: {
    'change input[type=checkbox]': 'onChange'
  },

  // Keeps updated Storage.filtersState while adding/removing a filter
  onChange: function() {
    var name = this.model.get('name');
    var type = this.model.get('type');
    var collectionByType = Storage.filtersState.get(type);
    var selectedModel = collectionByType.findWhere({'name': name});
    if (selectedModel) {
      collectionByType.remove(selectedModel);
    } else {
      collectionByType.add(this.model);
    }
    // hack - intentionally call 'change' event
    Storage.filtersState.trigger('change');
  },

  onAttach: function() {
    this._setFilterCheckboxes();
  },

  // set existing filter checkboxes
  _setFilterCheckboxes: function() {
    var type = this.model.get('type');
    var name = this.model.get('name');
    if (Storage.filtersState.get(type).findWhere({'name': name})) {
      this.$el.find('input').prop('checked', true);
    }
  }
});