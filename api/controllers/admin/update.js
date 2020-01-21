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
    },
    password: {
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

    if (admin.grade) {
      let projectsId = (await Project.find({grade: admin.grade})).map(project => project.id);

      await GroupReport.update({ project: { in: projectsId }})
        .set({
          guideteacher: admin.fullName
        });
    }

    admin = await Admin.findOne(admin.id)
      .populate('grade');

    return admin;

  }


};
