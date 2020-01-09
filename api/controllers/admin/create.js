module.exports = {


  friendlyName: 'Create',


  description: 'Create admin.',


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
    grade: {
      type: 'string',
    }
  },


  exits: {
    success: {
      description: 'New student account was created successfully.'
    },

    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },
  },


  fn: async function (inputs) {

    let admin = Admin.create({
      fullName: inputs.fullName,
      email: inputs.email,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      grade: inputs.grade || null,
    })
    .intercept('E_UNIQUE', 'emailAlreadyInUse')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    return admin;

  }


};
