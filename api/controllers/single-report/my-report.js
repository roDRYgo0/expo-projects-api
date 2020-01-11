module.exports = {


  friendlyName: 'My report',


  description: '',

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

      let report = await SingleReport.findOne({student: this.req.me})
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
