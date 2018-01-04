import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import template from './number-item-template.hbs';

export default Marionette.View.extend({
  template,

  initialize(options) {
    this.products = options.products;
    this.model = new Backbone.Model({ productsNumber: this.products.length });
  },

  onFilterProducts() {
    this.model.set('productsNumber', this.products.length);
    this.render();
  },
});
