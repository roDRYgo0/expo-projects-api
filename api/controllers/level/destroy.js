module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy level.',


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

    let grades = await Grade.find({level: id});

    if (grades.length) {
      throw 'conflict';
    }

    let level = await Level.destroyOne({id: id}) || null;

    return level ? exits.success(level) : exits.notFound();

  }


};
