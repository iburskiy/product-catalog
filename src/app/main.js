import $ from 'jquery';
import Backbone from 'backbone';
import Model from './model';
import Router from './router';
import Collection from './collection';


const router = new Router();
var model=new Model();
var collection =new Collection();
var a =[];
$.getJSON('./notebooks.json', function (data) {

    for(var i=0;i<data.list.length;i++){
        collection.add(data.list[i]);

    }


});

//collection.add(a[0]);
console.log(collection);
Backbone.history.start();
