module.exports = {


  friendlyName: 'Update',


  description: 'Update admin.',


  inputs: {
    id: {
      type: 'string',
      required: true,
    },
    fullName: {
      type: 'string',
    },
    email: {
      type: 'string',
      isEmail: true,
    },
    controlAccess: {
      type: 'string',
      isIn: ['si', 'no'],
    },
    grade: {
      type: 'string',
    }
  },


  exits: {
    invalid: {
      responseType: 'badRequest',
    },

    emailAlreadyInUse: {
      statusCode: 409,
    },
  },


  fn: async function ({ id, fullName, email, controlAccess, grade}) {

    let admin = await Admin.updateOne(id)
      .set({
        fullName,
        email: email ? email.toLowerCase() : undefined,
        controlAccess,
        grade
      })
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept({name: 'UsageError'}, 'invalid');

    return admin;

  }


};
