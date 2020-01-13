var jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Create jwt',


  description: 'Create token with user inf',


  inputs: {
    user: {
      description: 'User object that with contains all properties.',
      type: 'ref',
      required: true,
    },
    rol: {
      description: 'User rol',
      type: 'string',
      required: true,
    },
    project: {
      description: 'User project',
      type: 'string',
      required: true,
    },
    controlAccess: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({ user, rol, project, controlAccess}, exits) {
    let token = await jwt.sign({
      id: user.id,
      grade: user.grade ? user.grade.id || '0' : '0',
      rol,
      project,
      controlAccess
    }, sails.config.custom.jwtKey);
    exits.success(token);
  }


};

