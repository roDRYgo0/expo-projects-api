module.exports = {


  friendlyName: 'Find',


  description: 'Find first admin.',

  exits: {
    success: {
      statusCode: 204
    },
    invalid: {
      statusCode: 200
    }
  },


  fn: async function () {

    let admins = await Admin.find();

    if (admins.length) {
      throw 'invalid';
    }

  }


};
