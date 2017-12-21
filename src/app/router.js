/* eslint-disable import/no-webpack-loader-syntax,import/no-unresolved */
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import data from '!json!../static/json/notebook.json';
import LayoutView from './pages/layout-view';
import { Region } from './regions';
import DetailsView from './pages/details/layout-view';
import Storage from './utils/storage';

export const products = new Backbone.Collection(data.productList);

export const Router = Marionette.AppRouter.extend({
  initialize() {
    this.region = new Region();
    Storage.initFiltersState(data.filterFields);
  },
  routes: {
    '': 'home',
    'about/:notebook/*product': 'about',
  },
  home() {
    const view = new LayoutView({ products, filterFields: data.filterFields });
    this.region.get('content').show(view);
  },
  about(query, product) {
    const detailsView = new DetailsView({
      model: products.findWhere({ href: product }),
      productListLabels: data.productListLabels,
    });
    this.region.get('content').show(detailsView);
  },
});
