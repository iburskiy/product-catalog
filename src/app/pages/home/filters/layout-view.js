import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import $ from 'jquery';
import FilterCollection from '../../../entities/filter-collection';
import template from './layout-template.hbs';
import Storage from '../../../utils/storage';
import FilterCompositeView from './composite-view';
import FilterModel from '../../../entities/filter-model';

export default Marionette.LayoutView.extend({

  template,

  ui: {
    searchInput: '#search',
  },

  events: {
    'submit form': 'handleSearch',
  },

  initialize(options) {
    this.products = options.products;
    this.filterFields = options.filterFields;
  },

  onBeforeAttach() {
    this.ui.searchInput.val(Storage.searchModel.get('search'));
  },

  onAttach() {
    let counter = 1;
    let $filterViewBlock;

    const filters = this.prepareFilters(this.products, this.filterFields);

    /* Preparing DOM for filters dynamically depending on the number of filterFields in JSON:
     <div class="filters-container">
      <div class="filter-list1"></div>
      <div class="filter-list2"></div>
     </div>
      Each block filter-list1 dynamically becomes a region filled with FilterCompositeView
     */
    Object.keys(filters).forEach((type) => {
      $filterViewBlock = $(`<div class="filter-list${counter}"></div>`);
      this.$el.find('.filters-container').append($filterViewBlock);
      this.addRegion(`filterList${counter}`, `.filter-list${counter}`);
      this[`filterList${counter}`].show(new FilterCompositeView({
        collection: filters[type],
        model: new Backbone.Model({
          filterField: type,
        }),
      }));
      counter += 1;
    });
  },

  /* Prepare result as {'cpu': FilterCollection, 'date': FilterCollection, ...}
      depending on filterFields in JSON */
  prepareFilters(products, filterFields) {
    const result = {};
    let filterCollection;
    /* prepare object with empty collections:
        {'cpu': empty FilterCollection, 'date': empty FilterCollection, ...} */
    filterFields.forEach((filterField) => {
      result[filterField] = new FilterCollection();
    });
    products.each((model) => {
      filterFields.forEach((filterField) => {
        filterCollection = result[filterField];
        if (!filterCollection.findWhere({ name: model.get(filterField) })) {
          result[filterField].add(new FilterModel({
            type: filterField,
            name: model.get(filterField),
          }));
        }
      });
    });

    return result;
  },

  handleSearch(event) {
    event.preventDefault();
    Storage.searchModel.set('search', this.ui.searchInput.val());
  },
});
