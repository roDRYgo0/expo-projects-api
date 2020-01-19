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
      required: true,
    },
    quantity: {
      type: 'number',
      required: true,
    },
    entryDatetime: {
      type: 'string',
      required: true,
    },
    groupReport: {
      model: 'groupReport',
      required: true,
    }
  },

};

