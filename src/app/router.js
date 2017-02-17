import $ from 'jquery';
import Backbone from 'backbone';
import HelloView from './views/hello';
import notebook from '!json!../static/json/notebook.json';
import Collection from './collection';

var collection =new Collection();
collection.add(notebook.itemList);


export default Backbone.Router.extend({

  routes: {
    '': 'dashboard',
    'about': 'about'
  },

  initialize() {
    $('#content').append('<div id="navigation" class="col-lg-4 col-md-4 col-sm-5 col-xs-12"></div>');
    $('#navigation').append('<button id="btn-search" type="button"></button>');
    $('#navigation').append('<input type="text" id="text-search">');
    $('#content').append('<div id ="view" class="col-lg-8 col-md-8 col-sm-7 col-xs-12">');
    $('body').append('<div id="js-app"></div>');
  },
  dashboard() {
    var helloView = new HelloView({collection: collection}).render();
    $('#view').empty().append(helloView.$el);
    $('#btn-search').empty().append("S");
    $('#btn-search').bind('click', function () {
        var mass=collection.where({manufacturer: $('#text-search').val()});
        if($('#text-search').val()!=''){
          if(mass.length==0){
            $('#view').text("Nothing found!!!");
          }else {
              var newCollection = new Collection();
              for (var i = 0; i < mass.length; i++) {
                  newCollection.add(mass[i]);
              }
              var helloView = new HelloView({collection: newCollection}).render();
              $('#view').empty().append(helloView.$el);
          }
        }
        else {
            var helloView = new HelloView({collection: collection}).render();
            $('#view').empty().append(helloView.$el);
        }

    });
  },

  about() {
    var helloView = new HelloView({
      template: _.template('')
    }).render();
    $('#js-app').empty().append(helloView.$el);
  }

});
