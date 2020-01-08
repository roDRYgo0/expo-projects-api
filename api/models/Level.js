/**
 * Level.js
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
    shortName: {
      type: 'string',
      required: true,
    },
    withSpecialty: {
      type: 'string',
      required: true,
      isIn: ['si', 'no'],
    },
    typeSection: {
      type: 'string',
      required: true,
      isIn: ['alphabetic', 'numeric']
    }

  },

};

