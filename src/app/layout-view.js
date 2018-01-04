import Marionette from 'backbone.marionette';
import template from './layout-template.hbs';

export default Marionette.View.extend({
  el: 'body', // when el is set then the view's template is appended to this selector
  template,
  regions: {
    content: '#content',
  },
});
