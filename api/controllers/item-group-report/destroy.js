module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy item group report.',


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

    let groupReport = await GroupReport.findOne({project: this.req.project});

    let item = await ItemGroupReport.destroyOne({ id, groupReport: groupReport.id });

    return item ? exits.success(item) : exits.notFound();

  }


};
