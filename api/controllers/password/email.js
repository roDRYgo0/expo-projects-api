var randomize = require('randomatic');

module.exports = {


  friendlyName: 'Email',


  description: 'Email password.',


  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true,
    },
    rol: {
      type: 'string',
      required: true,
    }
  },


  exits: {
    success: {
      description: 'Successful email sending'
    }
  },


  fn: async function ({ email, rol}) {

    let user = null;

    let token = randomize('0', 6);
    let tokenExpiresAt =  Date.now() + sails.config.custom.passwordResetTokenTTL;

    // Valid if the user who wants to change password is a student
    if (rol === 'student') {
      user = await Student.findOne({email});

      if (user) {
        await Student.updateOne({id: user.id})
        .set({
          passwordResetToken: token,
          passwordResetTokenExpiresAt: tokenExpiresAt,
        });
      }
    }

    // Valid if the user who wants to change password is a admin or teacher
    else if (rol === 'teacher' || rol === 'admin') {
      user = await Admin.findOne({email});

      if (user) {
        await Admin.updateOne({id: user.id})
        .set({
          passwordResetToken: token,
          passwordResetTokenExpiresAt: tokenExpiresAt,
        });
      }
    }

    // If a match was found, the email is sent
    if (user) {
      sails.hooks.email.send(
        'reset-password',
        {
          token
        },
        {
          to: email,
          subject: 'Cambiar contraseña'
        },
        (err) => {console.log(err || 'Email send!');}
      );
    }

  }


};
