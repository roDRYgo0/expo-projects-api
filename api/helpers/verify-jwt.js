var jwt = require('jsonwebtoken');

module.exports = {

  friendlyName: 'Verify jwt',

  description: 'Verify a JWT token.',

  inputs: {
    req: {
      type: 'ref',
      friendlyName: 'Request',
      description: 'A reference to the request object (req).',
      required: true
    },
    res: {
      type: 'ref',
      friendlyName: 'Response',
      description: 'A reference to the response object (res).',
      required: false
    }
  },

  exits: {
    invalid: {
      description: 'Invalid token or no authentication present.',
    }
  },

  fn: function ({ req }, exits) {

    if (req.header('authorization')) {
      // if one exists, attempt to get the header data
      var token = req.header('authorization').split('Bearer ')[1];
      // if there's nothing after "Bearer", no go
      if (!token) {
        return exits.invalid();
      }
      // if there is something, attempt to parse it as a JWT token
      return jwt.verify(token, sails.config.custom.jwtKey, async (err, payload) => {
        if (err || !payload.id) {
          return exits.invalid();
        }

        req.me = payload.id;
        req.rol = payload.rol;
        req.project = payload.project;

        return exits.success(payload);

      });
    }
    return exits.invalid();
  }
};

