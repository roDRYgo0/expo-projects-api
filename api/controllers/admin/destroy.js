module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy admin.',


  inputs: {
    id: {
      type: 'number',
      required: true,
    }
  },


  exits: {
    notFound: {
      responseType: 'notFound',
    }
  },


  fn: async function ({ id }, exits) {

    let user = await Admin.destroyOne({id: id}) || null;

    if (user) {
      if (user.grade) {
        let projectsId = (await Project.find({grade: user.grade})).map(project => project.id);

        await GroupReport.update({ project: { in: projectsId }})
          .set({
            guideteacher: 'Sin maestro'
          });
      }
    }

    return user ? exits.success(user) : exits.notFound();

  }


};
