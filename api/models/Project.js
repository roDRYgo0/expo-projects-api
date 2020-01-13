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
      required: true,
      unique: true,
    },
    observations: {
      type: 'string',
    },
    description: {
      type: 'string',
      columnType: 'TEXT',
    },
    state: {
      type: 'string',
      required: true,
      isIn: ['confirmed', 'canceled'],
    },
    grade: {
      model: 'grade',
      required: true,
    },
    student: {
      collection:'student',
      via: 'project'
    }
  },

};

