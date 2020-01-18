module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy item single report.',


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

    let singleReport = await SingleReport.findOne({student: this.req.me});

    let item = await ItemSingleReport.destroyOne({ id, singleReport: singleReport.id });

    return item ? exits.success(item) : exits.notFound();

  }


};
