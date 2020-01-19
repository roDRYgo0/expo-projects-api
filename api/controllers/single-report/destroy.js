module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy single report.',


  inputs: {
    id: {
      type: 'number',
      required: true,
    }
  },


  exits: {
    notFound: {
      responseType: 'notFound',
    }
  },


  fn: async function ({ id }, exits) {

    await ItemSingleReport.destroy({singleReport: id});

    let report = await SingleReport.destroyOne({id: id}) || null;

    return report ? exits.success(report) : exits.notFound();

  }


};
