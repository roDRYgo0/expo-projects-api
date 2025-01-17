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

    await ItemGroupReport.destroy({groupReport: id});

    let report = await GroupReport.destroyOne({id: id}) || null;

    return report ? exits.success(report) : exits.notFound();

  }


};
