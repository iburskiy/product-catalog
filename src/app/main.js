// this eslint-disable to import json directly with "!json" that eslint doesn't like
/* eslint-disable import/no-webpack-loader-syntax,import/no-unresolved */
import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import data from '!json!../static/json/notebook.json';
import LayoutView from './layout-view';
import Router from './router';

const App = Marionette.Application.extend({
  initialize() {
    this.layout = new LayoutView();
    this.layout.render();
  },
});

const app = new App();

app.on('start', () => {
  // it's not really neccessary to assign it to app.router, the main thing is to initialize Router
  app.router = new Router({ data, appLayout: app.layout });
  Backbone.history.start();
});

app.start();
