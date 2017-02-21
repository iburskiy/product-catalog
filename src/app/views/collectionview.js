import $ from 'jquery';
import _ from 'lodash';
import Marionette from 'backbone.marionette';
import {MyView} from'./view'




export var CollectionView=Marionette.CollectionView.extend({
    childView: MyView
});

