'use strict'
import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import {CollectionView} from './views/collectionview';
import LayoutView from './views/layoutview';
import {MyView} from'./views/view';
import notebook from '!json!../static/json/notebook.json';
import {Collection} from './collection';
import template from './views/templateElem.hbs';
var collection =new Collection();
collection.add(notebook.itemList);
const layout=new LayoutView();
console.log(collection.length);

export default Backbone.Router.extend({
  routes: {
    '': 'dashboard',
    'about/:query/*w': 'about'
  },
    filterItem: function (coll) {
        collection=coll;
        if($('input[name=cpu]:checked').length>0) {
            var collectionC=new Collection();
            for (var i = 0; i < $('input[name=cpu]:checked').length; i++) {
                collectionC.add(collection.where({cpu: ($('input[name=cpu]:checked'))[i].attributes[3].value}));
            }
            collection = collectionC;
        }
        if($('input[name=date]:checked').length>0) {
            var collectionD=new Collection();
            for (var i = 0; i < $('input[name=date]:checked').length; i++) {
                collectionD.add(collection.where({date: ($('input[name=date]:checked'))[i].attributes[3].value}));
            }
            collection = collectionD;
        }
        if($('input[name=diagonal]:checked').length>0) {
            var collectionDi=new Collection();
            for (var i = 0; i < $('input[name=diagonal]:checked').length; i++) {
                collectionDi.add(collection.where({diagonal: parseFloat(($('input[name=diagonal]:checked'))[i].attributes[3].value)}));
            }
            collection = collectionDi;
        }
        var FilterItems= new CollectionView({collection: collection}).render();
        $('#view').empty().append(FilterItems.$el);
        console.log(collection);
    },

  dashboard() {
      layout.render();
      $('#content').empty().append(layout.$el);
      console.log(layout);
      var helloView = new CollectionView({collection: collection}).render();
      $('#view').empty().append(helloView.$el);
      //Фильтры

      $(":checkbox,#btn-search").bind('click',function () {
          var collF=collection;
          if($('input[name=cpu]:checked').length>0) {
              var collectionC=new Collection();
              for (var i = 0; i < $('input[name=cpu]:checked').length; i++) {
                  collectionC.add(collF.where({cpu: ($('input[name=cpu]:checked'))[i].attributes[3].value}));
              }
              collF = collectionC;
          }
          if($('input[name=date]:checked').length>0) {
              var collectionD=new Collection();
              for (var i = 0; i < $('input[name=date]:checked').length; i++) {
                  collectionD.add(collF.where({date: ($('input[name=date]:checked'))[i].attributes[3].value}));
              }
              collF = collectionD;
          }
          if($('input[name=diagonal]:checked').length>0) {
              var collectionDi=new Collection();
              for (var i = 0; i < $('input[name=diagonal]:checked').length; i++) {
                  collectionDi.add(collF.where({diagonal: parseFloat(($('input[name=diagonal]:checked'))[i].attributes[3].value)}));
              }
              collF = collectionDi;
          }
          var FilterItems= new CollectionView({collection: collF}).render();
          $('#view').empty().append(FilterItems.$el);

          var mass=collF.where({manufacturer : $('#text-search').val()});
          if($('#text-search').val()!=''){
              if(mass.length==0){
                  $('#view').text("Not found!!!");
              }else {
                  var newCollection = new Collection();
                  for (var i = 0; i < mass.length; i++) {
                      newCollection.add(mass[i]);
                  }
                  var helloView = new CollectionView({collection: newCollection}).render();
                  $('#view').empty().append(helloView.$el);
              }
          }
          else {
              var helloView = new CollectionView({collection: collF}).render();
              $('#view').empty().append(helloView.$el);
          }
      });
  },

  about(query, w) {
      var mass=collection.where({href : w});
      var Details = new MyView({template: template,model: mass[0]}
      ).render();
      $('#content').empty().append(Details.$el);
  }

});
