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
    state: {
      type: 'string',
      isIn: ['confirmed', 'canceled'],
      defaultsTo: 'confirmed'
    },
    grade: {
      model: 'grade',
      required: true,
    },
    student: {
      collection:'student',
      via: 'project'
    },
    groupReport: {
      collection:'groupReport',
      via: 'project'
    },
    observations: {
      collection:'observation',
      via: 'project'
    }
  },

};

