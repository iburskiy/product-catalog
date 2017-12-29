/* eslint-disable import/first,no-undef */
import $ from 'jquery';
import Backbone from 'backbone';
import chai from 'chai';

const { expect } = chai;

import Router from '../src/app/router';


describe('Integration tests', () => {
  const router = new Router();
  Backbone.history.start();

  const $app = $('#js-app');


  describe('Dashboard page sample testing', () => {
    it('should render hello world on first render', () => {
      expect($app.text()).to.equal('Hello world!');
    });
  });

  describe('About page sample testing', () => {
    it('should render Im the about page', () => {
      router.navigate('about', { trigger: true, replace: true });

      expect($app.text()).to.equal('Im the about page');
    });
  });
});
