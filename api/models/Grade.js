/**
 * Grade.js
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
    level: {
      model: 'level',
      required: true,
    },
    specialty: {
      model: 'specialty',
    },
    section: {
      model: 'section',
    },
    projects: {
      collection: 'project',
      via: 'grade'
    }

  },

};

