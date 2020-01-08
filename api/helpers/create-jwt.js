var jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Create jwt',


  description: 'Create token with user inf',


  inputs: {
    user: {
      description: 'Objeto de usuario que contiene todas las propiedades.',
      type: 'ref',
      required: true,
    }
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
      email: user.email
    }, sails.config.custom.jwtKey);
    exits.success(token);
  }


};

