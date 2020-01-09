module.exports = {


  friendlyName: 'Find',


  description: 'Find first admin.',


  fn: async function () {

    let admins = await Admin.find();

    if (admins.length) {
      this.res.unauthorized();
    }

  }


};
