module.exports = {


  friendlyName: 'Login',


  description: 'Log in using the provided email and password combination.',


  inputs: {
    email: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
