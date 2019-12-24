/**
 * Project.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },
    projectId: {
      type: 'number',
      required: true
    },
    observations: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      columnType: 'TEXT',
    },
    state: {
      type: 'string',
      required: true,
      isIn: ['confirmed', 'unconfirmed', 'canceled'],
    },
    grade: {
      model: 'grade'
    },
    student: {
      collection:'student',
      via: 'project'
    }
  },

};

