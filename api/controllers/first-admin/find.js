module.exports = {


  friendlyName: 'Find',


  description: 'Find first admin.',

  exits: {
    success: {
      description: 'New student account was created successfully.'
    },
  },


  fn: async function () {

    let admins = await Admin.find();

    if (admins.length) {
      return this.res.unauthorized();
    }

  }


};
