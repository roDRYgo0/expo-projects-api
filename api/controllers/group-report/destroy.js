module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy group report.',


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

    let report = await GroupReport.findOne(id);

    if (!report) {
      throw 'notFound';
    }

    await ItemGroupReport.destroy({groupReport: report.id});

    report = await GroupReport.destroyOne({id: report.id}) || null;

    return report ? exits.success(report) : exits.notFound();

  }


};
