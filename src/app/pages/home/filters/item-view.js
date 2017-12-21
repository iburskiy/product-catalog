import Marionette from 'backbone.marionette';
import template from './item-template.hbs';
import Storage from '../../../utils/storage';

export default Marionette.ItemView.extend({
  template,
  tagName: 'li',

  events: {
    'change input[type=checkbox]': 'onChange',
  },

  // Keeps updated Storage.filtersState while adding/removing a filter
  onChange() {
    const name = this.model.get('name');
    const type = this.model.get('type');
    const collectionByType = Storage.filtersState.get(type);
    const selectedModel = collectionByType.findWhere({ name });
    if (selectedModel) {
      collectionByType.remove(selectedModel);
    } else {
      collectionByType.add(this.model);
    }
    // hack - intentionally call 'change' event
    Storage.filtersState.trigger('change');
  },

  onAttach() {
    this.setFilterCheckboxes();
  },

  // set existing filter checkboxes
  setFilterCheckboxes() {
    const type = this.model.get('type');
    const name = this.model.get('name');
    if (Storage.filtersState.get(type).findWhere({ name })) {
      this.$el.find('input').prop('checked', true);
    }
  },
});
