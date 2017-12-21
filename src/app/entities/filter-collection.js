import Backbone from 'backbone';
import FilterModel from './filter-model';

export default Backbone.Collection.extend({
  model: FilterModel,
});

