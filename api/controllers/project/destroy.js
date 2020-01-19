module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy project.',


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
      description: 'there are associated users',
    }
  },


  fn: async function ({ id }, exits) {

    let students = await Student.find({project: id});

    if (students.length) {
      throw 'conflict';
    }

    let reportsId = (await GroupReport.destroy({project: id}).fetch()).map(x => x.id);

    await ItemGroupReport.destroy({ groupReport: { in: reportsId}});

    let project = await Project.destroyOne({id: id}) || null;

    return project ? exits.success(project) : exits.notFound();

  }


};
