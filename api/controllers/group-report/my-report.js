module.exports = {


  friendlyName: 'My report',


  description: 'Get my group report for the token',


  exits: {
    unauthorized: {
      responseType: 'unauthorized',
    },

    notFound: {
      responseType: 'notFound',
    }
  },


  fn: async function () {

    if (this.req.rol === 'student') {

      let report = await GroupReport.findOne({project: this.req.project})
        .populate('items');

      if (!report) {
        throw 'notFound';
      }

      return report;

    } else {
      throw 'unauthorized';
    }

  }


};
