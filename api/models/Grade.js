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
    section: {
      model: 'section',
      required: true,
    },
    specialty: {
      model: 'specialty',
      required: true,
    },
    level: {
      model: 'level',
      required: true,
    },
    projects: {
      collection: 'project',
      via: 'grade'
    },
    student: {
      collection:'student',
      via: 'grade'
    }

  },

};

