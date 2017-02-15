import $ from 'jquery';
import Backbone from 'backbone';
import HelloView from './views/hello';


export default Backbone.Router.extend({

  routes: {
    '': 'dashboard',
    'about': 'about'
  },

  initialize() {

    $('#content').append('<div id="navigation" class="col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>');
    $('#navigation').append('<form id="search" class="form-search col-lg-12 col-md-12 col-sm-12 col-xs-12"></form>');
    $('#search').append('<button type="submit" class="btn"></button>');
    $('#search').append('<input type="text" class="input-medium search-query">');
    $('#content').append('<div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">');
    $('body').append('<div id="js-app"></div>');
    $('#js-app').append('<a id="open"></a>');
  },

  dashboard() {
    var helloView = new HelloView().render();

    $('#open').empty().append(helloView.$el);
    $('.btn').empty().append("S")
  },

  about() {
    var helloView = new HelloView({
      template: _.template('Im the about page')
    }).render();

    $('#js-app').empty().append(helloView.$el);
  }

});
