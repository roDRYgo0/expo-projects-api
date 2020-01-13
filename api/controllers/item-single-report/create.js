module.exports = {


  friendlyName: 'Create',


  description: 'Create item single report.',


  inputs: {
    name: {
      type: 'string',
      required: true,
    },
    quantity: {
      type: 'number',
      required: true,
    },
  },


  exits: {
    success: {
      description: 'New group project was created successfully.'
    },

    invalid: {
      responseType: 'badRequest',
      description: 'The provided coordinatorname, and/or guideteacher are invalid.',
    },

    unauthorized: {
      responseType: 'unauthorized',
    }
  },


  fn: async function ({ name, quantity }) {

    if (this.req.rol === 'student') {
      let singleReport = await SingleReport.findOne({student: this.req.me});

      if (!singleReport) {
        throw 'invalid';
      }

      let item = await ItemSingleReport.create({
        name,
        quantity,
        singleReport: singleReport.id
      })
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();

      return item;

    } else {
      throw 'unauthorized';
    }

  }


};