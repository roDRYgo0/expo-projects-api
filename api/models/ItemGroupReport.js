/**
 * ItemGroupReport.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
    },
    quantity: {
      type: 'number',
    },
    entryDatetime: {
      type: 'number',
    },
    groupReport: {
      model: 'GroupReport',
      required: true,
    }
  },

};

