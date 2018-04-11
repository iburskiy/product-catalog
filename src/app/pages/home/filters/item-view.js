import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import template from './item-template.hbs';
import Storage from '../../../utils/storage';

export default Marionette.View.extend({
  template,
  tagName: 'li',

  events: {
    'change input[type=checkbox]': 'onChange',
  },

  initialize() {
    this.basicChannel = Backbone.Radio.channel('basic');
  },
  // Keeps updated Storage.filtersState while adding/removing a filter
  onChange() {
    const name = this.model.get('name');
    const type = this.model.get('type');
    const collectionByType = Storage.filtersState.get(type);
    const selectedModel = collectionByType.findWhere({ name });
    if (this.$el.find('input').prop('checked')) {
      collectionByType.add(this.model);
    } else if (selectedModel) {
      collectionByType.remove(selectedModel);
    }
    this.basicChannel.trigger('filter:changed');
  },

  onAttach() {
    this.setFilterCheckboxes();
    this.listenTo(this.basicChannel, 'filters:cleared', () => {
      const input = this.$el.find('input');
      if (input.prop('checked')) {
        this.$el.find('input').prop('checked', false).change();
      }
    });
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
