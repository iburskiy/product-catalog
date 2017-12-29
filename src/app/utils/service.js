/* eslint-disable no-param-reassign */
import FilterModel from '../entities/filter-model';
import FilterCollection from '../entities/filter-collection';

export function filterByFields(collection, filters) {
  const attrs = filters.attributes;
  if (!collection.length) {
    return [];
  }

  let filterCollection;
  Object.keys(attrs).forEach((type) => {
    filterCollection = attrs[type];
    if (filterCollection.length) {
      collection = collection.filter(item =>
        filterCollection.findWhere({ name: item.get(type) }));
    }
  });

  return collection;
}

export function filterBySearch(collection, search) {
  return collection.filter(model => (`${model.get('manufacturer')} ${model.get('model')}`).match(new RegExp(search, 'i')));
}

/* Prepare result as {'cpu': FilterCollection, 'date': FilterCollection, ...}
      depending on filterFields in JSON */
export function prepareFilters(collection, filterFields) {
  const result = {};
  let filterCollection;
  /* prepare object with empty collections:
      {'cpu': empty FilterCollection, 'date': empty FilterCollection, ...} */
  filterFields.forEach((filterField) => {
    result[filterField] = new FilterCollection();
  });
  collection.each((model) => {
    filterFields.forEach((filterField) => {
      filterCollection = result[filterField];
      if (!filterCollection.findWhere({ name: model.get(filterField) })) {
        result[filterField].add(new FilterModel({
          type: filterField,
          name: model.get(filterField),
        }));
      }
    });
  });

  return result;
}
