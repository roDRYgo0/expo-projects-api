module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy specialty.',


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

    let grades = await Grade.find({specialty: id});

    if (grades.length) {
      throw 'conflict';
    }

    let specialty = await Specialty.destroyOne({id: id}) || null;

    return specialty ? exits.success(specialty) : exits.notFound();

  }


};
