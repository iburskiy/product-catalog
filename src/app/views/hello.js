import $ from 'jquery';
import _ from 'lodash';
import Marionette from 'backbone.marionette';
import template from './template.hbs';


export default Marionette.ItemView.extend({
  className:'col-lg-12 col-md-12 col-sm-12 col-xs-12',
  template: template,
});

