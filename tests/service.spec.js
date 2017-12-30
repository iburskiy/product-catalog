/* eslint-disable no-undef */
import Backbone from 'backbone';
import chai from 'chai';
import { filterBySearch } from '../src/app/utils/service';

const { expect } = chai;

describe('Service tests', () => {
  describe('#filterBySearch', () => {
    let collection;
    beforeEach(() => {
      collection = new Backbone.Collection();
      collection.add(new Backbone.Model({
        model: 'Zbook',
        manufacturer: 'HP',
      }));
      collection.add(new Backbone.Model({
        model: 'Macbook',
        manufacturer: 'Apple',
      }));
    });

    it('should filter collection by search and get 1 result', () => {
      const result = filterBySearch(collection, 'HP');
      expect(result.length).to.equal(1);
    });

    it('should filter collection by search and get 0 result', () => {
      const result = filterBySearch(collection, 'QQ');
      expect(result.length).to.equal(0);
    });
  });
});
