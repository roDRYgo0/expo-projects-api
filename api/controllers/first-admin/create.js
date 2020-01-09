module.exports = {


  friendlyName: 'Create',


  description: 'Create first admin.',


  inputs: {
    fullName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      isEmail: true,
    },
    password: {
      required: true,
      type: 'string',
      maxLength: 200,
    },
  },


  exits: {
    success: {
      description: 'New student account was created successfully.'
    },

    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
    },
  },


  fn: async function (inputs) {

    let admins = await Admin.find();

    if (admins.length) {
      return this.res.unauthorized();
    }

    await Admin.create({
      fullName: inputs.fullName,
      email: inputs.email,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      grade: null,
    })
    .intercept({name: 'UsageError'}, 'invalid');

  }


};
