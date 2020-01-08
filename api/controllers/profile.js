module.exports = {


  friendlyName: 'Profile',


  description: 'Profile user.',

  exits: {
    success: {
      description: 'Return authenticated user',
    }
  },


  fn: async function () {

    return this.req.me;

  }


};
