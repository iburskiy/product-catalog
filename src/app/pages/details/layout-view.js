import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import template from './layout-template.hbs';
import ItemView from './item-view';

export default Marionette.View.extend({
  template,

  regions: {
    detailsRegion: '.details',
  },

  initialize(options) {
    this.model = options.model;
    this.productListLabels = options.productListLabels;
  },

  onAttach() {
    const itemView = new ItemView({
      model: this.prepareModel(),
    });
    this.showChildView('detailsRegion', itemView);
  },

  prepareModel() {
    const productDetails = [];
    Object.keys(this.model.attributes).forEach((attr) => {
      if (this.productListLabels[attr]) {
        productDetails.push({ label: this.productListLabels[attr], value: this.model.get(attr) });
      }
    });

    return new Backbone.Model({ productDetails });
  },
});
