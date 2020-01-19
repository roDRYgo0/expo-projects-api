module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy grade.',


  inputs: {
    id: {
      type: 'number',
      required: true,
    }
  },


  exits: {
    notFound: {
      responseType: 'notFound',
    },
    conflict: {
      statusCode: 409,
      description: 'there are associated projects or admins',
    }
  },


  fn: async function ({ id }, exits) {

    let projects = await Project.find({grade: id});
    let admins = await Admin.find({grade: id});

    if (projects.length || admins.length) {
      throw 'conflict';
    }

    let grade = await Grade.destroyOne({id: id}) || null;

    return grade ? exits.success(grade) : exits.notFound();

  }


};
