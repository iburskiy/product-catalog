import Backbone from 'backbone';

/**
 * filterState is just a collection of FilterModels
 * search stores the value from Search Input
 */
export default {
  filtersState: null,
  /* use Backbone Model instead of simple String
      to have benefits from subscription to Backbone events like "change"
   */
  searchModel: new Backbone.Model({ search: '' }),

  initFiltersState(filterFields) {
    this.filtersState = new Backbone.Model();
    filterFields.forEach(filterField =>
      this.filtersState.set(filterField, new Backbone.Collection()));
  },
};
