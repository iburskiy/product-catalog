import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import LayoutView from './pages/layout-view';
import DetailsView from './pages/details/layout-view';
import Storage from './utils/storage';

export default Marionette.AppRouter.extend({
  initialize(options) {
    this.appLayout = options.appLayout;
    this.data = options.data;
    this.products = new Backbone.Collection(this.data.productList);
    Storage.initFiltersState(this.data.filterFields);
  },
  routes: {
    '': 'home',
    'about/:notebook/*product': 'about',
  },
  home() {
    const view = new LayoutView({ products: this.products, filterFields: this.data.filterFields });
    this.appLayout.content.show(view);
  },
  about(query, product) {
    const detailsView = new DetailsView({
      model: this.products.findWhere({ href: product }),
      productListLabels: this.data.productListLabels,
    });
    this.appLayout.content.show(detailsView);
  },
});
