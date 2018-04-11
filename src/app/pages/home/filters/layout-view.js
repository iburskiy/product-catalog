import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import $ from 'jquery';
import template from './layout-template.hbs';
import Storage from '../../../utils/storage';
import FilterCompositeView from './composite-view';
import { prepareFilters } from '../../../utils/service';

export default Marionette.View.extend({

  template,

  ui: {
    searchInput: '#search',
  },

  events: {
    'submit form': 'handleSearch',
    'search #search': 'handleSearch', // event to catch click on X icon in Search
    'click .clear-filters': 'clearFilters',
  },

  initialize(options) {
    this.products = options.products;
    this.filterFields = options.filterFields;
    this.basicChannel = Backbone.Radio.channel('basic');
  },

  onBeforeAttach() {
    this.ui.searchInput.val(Storage.searchModel.get('search'));
  },

  onAttach() {
    let counter = 1;
    let $filterViewBlock;

    const filters = prepareFilters(this.products, this.filterFields);

    /* Preparing DOM for filters dynamically depending on the number of filterFields in JSON:
     <div class="filters-container">
      <div class="filter-list1"></div>
      <div class="filter-list2"></div>
      ...
     </div>
      Each block filter-list1 dynamically becomes a region filled with FilterCompositeView
     */
    Object.keys(filters).forEach((type) => {
      $filterViewBlock = $(`<div class="filter-list${counter}"></div>`);
      this.$el.find('.filters-container').append($filterViewBlock);
      this.addRegion(`filterList${counter}`, `.filter-list${counter}`);
      this.showChildView(`filterList${counter}`, new FilterCompositeView({
        collection: filters[type],
        model: new Backbone.Model({
          filterField: type,
        }),
      }));
      counter += 1;
    });
  },

  handleSearch(event) {
    if (event) {
      event.preventDefault();
    }
    Storage.searchModel.set('search', this.ui.searchInput.val());
    this.basicChannel.trigger('search:changed');
  },

  clearFilters() {
    Storage.initFiltersState(this.filterFields);
    this.ui.searchInput.val('');
    this.handleSearch();
    this.basicChannel.trigger('filters:cleared');
  },
});
