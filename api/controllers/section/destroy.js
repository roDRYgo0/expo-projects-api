module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy section.',


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
      description: 'there are associated grade',
    }
  },


  fn: async function ({ id }, exits) {

    let grades = await Grade.find({section: id});

    if (grades.length) {
      throw 'conflict';
    }

    let section = await Section.destroyOne({id: id}) || null;

    return section ? exits.success(section) : exits.notFound();

  }


};
