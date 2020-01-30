module.exports = {


  friendlyName: 'Create',


  description: 'Create group report.',


  inputs: {
    coordinatorname: {
      type: 'string',
      required: true,
    },
  },


  exits: {
    invalid: {
      responseType: 'badRequest',
      description: 'The provided coordinatorname, and/or guideteacher are invalid.',
    },

    projectAlreadyExist: {
      statusCode: 409,
      description: 'The provided project is already exist.',
    },
  },


  fn: async function ({ coordinatorname }) {
    let groupReport = await GroupReport.create({
      coordinatorname,
      guideteacher: 'notFound',
      project: this.req.project,
    })
      .intercept('E_UNIQUE', 'projectAlreadyExist')
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();

    return groupReport;

  }


};
