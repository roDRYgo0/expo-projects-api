/**
 * Student.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    fullName: {
      type: 'string',
      required: true,
    },
    carnet: {
      type: 'number',
      required: true,
      unique: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
    },
    password: {
      type: 'string',
      required: true,
    },
    project: {
      model: 'project',
      unique: true,
    },
    grade: {
      model: 'grade',
      unique: true,
    },

  },

};

