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
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    let user = inputs.user;
    let token = await jwt.sign({
      id: user.id,
      email: user.email,
      rol: inputs.rol,
      project: inputs.project,
    }, sails.config.custom.jwtKey);
    exits.success(token);
  }


};

