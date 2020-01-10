module.exports = {


  friendlyName: 'Change password',


  description: '',


  inputs: {
    password: {
      required: true,
      type: 'string',
      maxLength: 200,
    },
    newPassword: {
      required: true,
      type: 'string',
      maxLength: 200,
    },
  },


  exits: {
    invalid: {
      responseType: 'badRequest',
    },
    unauthorized: {
      responseType: 'unauthorized',
    },
  },


  fn: async function ({ password, newPassword}) {

    if (this.req.rol === 'student') {
      
      let student = await Student.findOne(this.req.me);

      if (!student) {
        throw 'invalid';
      }

      await sails.helpers.passwords.checkPassword(password, student.password)
        .intercept('incorrect', ()=> {return {unauthorized: 'La contraseña es incorrecta'}});

      await Student.updateOne({id: student.id})
        .set({
          password: await sails.helpers.passwords.hashPassword(newPassword),
        });

    } else {
      this.res.unauthorized('Not a student');
    }

  }


};
