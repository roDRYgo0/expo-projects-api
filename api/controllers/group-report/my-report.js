module.exports = {


  friendlyName: 'My report',


  description: 'Get my group report for the token',


  exits: {
    notFound: {
      responseType: 'notFound',
    }
  },


  fn: async function () {

    let report = await GroupReport.findOne({project: this.req.project})
        .populate('items');

    if (!report) {
      throw 'notFound';
    }

    return report;
  }


};
