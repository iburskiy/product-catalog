

import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import { Router } from './router';

const App = new Marionette.Application();

App.addRegions({
  content: '#content',
});

App.addInitializer(() => {
  const router = new Router();
  Backbone.history.start();
});
App.start();

export default App;
