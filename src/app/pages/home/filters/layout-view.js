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

  /**
   * If handleSearch is called by event ('submit' or 'search'), I emit 'filter:changed'.
   * If handleSearch is called from the code, I postpone to call 'filter:changed' to avoid
   * calling high cost 'filterProducts' twice.
   * @param event
   * @param postponeCallEvent
   */
  handleSearch(event, postponeCallEvent) {
    if (event) {
      event.preventDefault();
    }
    const isSearchChanged = this.isSearchChanged();
    if (isSearchChanged) {
      Storage.searchModel.set('search', this.ui.searchInput.val());
      if (!postponeCallEvent) {
        this.basicChannel.trigger('filter:changed');
      }
    }
  },

  isSearchChanged() {
    const newValue = this.ui.searchInput.val();
    const oldValue = Storage.searchModel.get('search');
    return oldValue !== newValue;
  },

  /**
   * Here we don't make a difference either search or filters is changed.
   * For both cases 'filter:changed' is called.
   */
  clearFilters() {
    Storage.initFiltersState(this.filterFields);
    this.ui.searchInput.val('');
    this.handleSearch(null, true);
    const checkedChkboxes = this.$el.find('input:checked');
    if (checkedChkboxes.length) {
      this.$el.find('input').prop('checked', false);
    }
    this.basicChannel.trigger('filter:changed');
  },
});
