module.exports = {


  friendlyName: 'Create',


  description: 'Create group report.',


  inputs: {
    coordinatorname: {
      type: 'string',
      required: true,
    },
    guideteacher: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    success: {
      description: 'New group project was created successfully.'
    },

    invalid: {
      responseType: 'badRequest',
      description: 'The provided coordinatorname, and/or guideteacher are invalid.',
    },

    projectAlreadyExist: {
      statusCode: 409,
      description: 'The provided project is already exist.',
    },

    unauthorized: {
      responseType: 'unauthorized',
    }
  },


  fn: async function ({ coordinatorname, guideteacher }) {

    if (this.req.rol === 'student') {

      let groupReport = await GroupReport.create({
        coordinatorname,
        guideteacher,
        project: this.req.project,
      })
      .intercept('E_UNIQUE', 'projectAlreadyExist')
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();

      return groupReport;

    } else {
      throw {unauthorized: 'You need to be a student'}
    }

  }


};
