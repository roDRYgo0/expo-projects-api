/**
 * GroupReport.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    coordinatorname: {
      type: 'string',
      required: true,
    },
    guideteacher: {
      type: 'string',
      required: true,
    },
    justification: {
      type: 'string',
      columnType: 'TEXT',
    },
    verified:{
      type: 'string',
      isIn: ['si', 'no'],
      defaultsTo: 'no',
    },
    project: {
      model: 'project',
      unique: true,
      required: true,
    },
    items: {
      collection: 'ItemGroupReport',
      via: 'groupReport'
    }
  },

};

