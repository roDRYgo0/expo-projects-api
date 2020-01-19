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
      type: 'string',
      required: true,
      maxLength: 200,
    },
    controlAccess: {
      type: 'string',
      isIn: ['si', 'no'],
      defaultsTo: 'no'
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


  fn: async function ({ fullName, email, password, controlAccess, grade}) {

    let admin = await Admin.create({
      fullName,
      controlAccess,
      email: email.toLowerCase(),
      password: await sails.helpers.passwords.hashPassword(password),
      grade: grade || null,
    })
    .intercept('E_UNIQUE', 'emailAlreadyInUse')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    if (admin.grade) {
      let projectsId = (await Project.find({grade: admin.grade})).map(project => project.id);
      console.log(projectsId);
      await GroupReport.updateOne({ project: { in: projectsId }})
        .set({
          guideteacher: admin.fullName
        });
    }

    return admin;

  }


};
