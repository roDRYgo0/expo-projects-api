module.exports = {


  friendlyName: 'Update',


  description: 'Update group report.',


  inputs: {
    coordinatorname: {
      type: 'string',
    },
    justification: {
      type: 'string',
    },
  },


  exits: {
    notFound: {
      responseType: 'notFound'
    }
  },


  fn: async function ({ coordinatorname, justification }) {

    let groupReport = await GroupReport.findOne({ project: this.req.project });

    if (!groupReport) {
      throw 'notFound';
    }

    groupReport = await GroupReport.updateOne({id: groupReport.id})
      .set({
        coordinatorname,
        justification,
      });

    return groupReport;

  }


};
