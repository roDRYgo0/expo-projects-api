module.exports = {


  friendlyName: 'Reset',


  description: 'Reset password.',


  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true,
    },
    rol: {
      type: 'string',
      required: true,
    },
    code: {
      type: 'number',
      required: true,
    },
    password: {
      required: true,
      type: 'string',
      maxLength: 200,
    }
  },


  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },


  fn: async function ({ email, code, rol, password }) {

    let user = null;

    if (rol === 'student') {
      user = await Student.findOne({email: email.toLowerCase()});

      if (user.passwordResetTokenExpiresAt >= Date.now()) {

        if (+user.passwordResetToken === +code) {
          await Student.updateOne({id: user.id})
          .set({
            passwordResetToken: null,
            passwordResetTokenExpiresAt: null,
            password: await sails.helpers.passwords.hashPassword(password)
          });
        } else {
          throw { invalid: 'Código invalido'};
        }

      } else {
        throw { invalid: 'El código a expirado'};
      }
    }

    else if (rol === 'teacher' || rol === 'admin') {
      user = await Admin.findOne({email: email.toLowerCase()});

      if (user.passwordResetTokenExpiresAt >= Date.now()) {

        if (+user.passwordResetToken === +code) {
          await Admin.updateOne({id: user.id})
          .set({
            passwordResetToken: null,
            passwordResetTokenExpiresAt: null,
            password: await sails.helpers.passwords.hashPassword(password)
          });
        } else {
          throw { invalid: 'Código invalido'};
        }

      } else {
        throw { invalid: 'El código a expirado'};
      }
    }

    else {
      throw { invalid: 'Invalid rol'};
    }

  }


};
