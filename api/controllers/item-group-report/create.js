module.exports = {


  friendlyName: 'Create',


  description: 'Create item group report.',


  inputs: {
    name: {
      type: 'string',
      required: true,
    },
    quantity: {
      type: 'number',
      required: true,
    },
    entryDatetime: {
      type: 'string',
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


  fn: async function ({ name, quantity, entryDatetime }) {

    if (this.req.rol === 'student' && this.req.project) {
      let groupReport = await GroupReport.findOne({project: this.req.project});

      let time = (new Date(+entryDatetime)).getTime();

      if (isNaN(time)) {
        time = (new Date(entryDatetime)).getTime();

        if (isNaN(time) || !time) {
          throw {invalid: 'entryDatetime is invalid'};
        }
      }

      let item = await ItemGroupReport.create({
        name,
        quantity,
        entryDatetime: time,
        groupReport: groupReport.id
      })
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();

      return item;

    } else {
      throw 'unauthorized';
    }

  }


};
