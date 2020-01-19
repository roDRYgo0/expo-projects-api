module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy grade.',


  inputs: {
    id: {
      type: 'number',
      required: true,
    }
  },


  exits: {
    notFound: {
      responseType: 'notFound',
    },
    conflict: {
      statusCode: 409,
      description: 'there are associated users',
    }
  },


  fn: async function ({ id }, exits) {

    // All done.
    return;

  }


};
