import $ from 'jquery';
import _ from 'lodash';
import Marionette from 'backbone.marionette';
import template from './template.hbs';
import templatefilter from './templatefilter.hbs'




export var MyView= Marionette.ItemView.extend({
  template: template,
  serializeCollection(){
    return this.model
  }

})




