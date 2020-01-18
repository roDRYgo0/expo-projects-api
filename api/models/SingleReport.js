/**
 * SingleReport.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    observation: {
      type: 'string',
      allowNull: true,
    },
    entryname: {
      type: 'string',
      allowNull: true,
    },
    entrydatetime: {
      type: 'number',
      columnType: 'BIGINT',
      allowNull: true,
    },
    departurename: {
      type: 'string',
      allowNull: true,
    },
    departuredatetime: {
      type: 'number',
      columnType: 'BIGINT',
      allowNull: true,
    },
    student: {
      model: 'student',
      required: true,
      unique: true,
    },
    items: {
      collection: 'itemSingleReport',
      via: 'singleReport'
    }
  },

};

