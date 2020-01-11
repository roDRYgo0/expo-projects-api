module.exports = {


  friendlyName: 'Create',


  description: 'Create single report.',

  exits: {
    success: {
      description: 'New single report was created successfully.'
    },

    userAlreadyExist: {
      statusCode: 409,
      description: 'The provided user is already exist.',
    },

    unauthorized: {
      responseType: 'unauthorized',
    }
  },


  fn: async function () {

    if (this.req.rol === 'student') {
      let singleReport = await SingleReport.create({
        student: this.req.me,
      })
      .intercept('E_UNIQUE', 'userAlreadyExist')
      .fetch();
      return singleReport;
    } else {
      throw 'unauthorized';
    }

  }


};
