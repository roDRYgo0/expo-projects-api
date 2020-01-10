module.exports = {


  friendlyName: 'Update',


  description: 'Update profile.',


  inputs: {
    carnet: {
      required: true,
      type: 'string',
    },
    password: {
      required: true,
      type: 'string',
      maxLength: 200,
    },
    fullName: {
      required: true,
      type: 'string',
    },
  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
