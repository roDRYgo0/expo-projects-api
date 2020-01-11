module.exports = {


  friendlyName: 'Create',


  description: 'Create level.',


  inputs: {
    name: {
      type: 'string',
      required: true,
    },
    shortName: {
      type: 'string',
      required: true,
    },
    withSpecialty : {
      type: 'boolean',
      defaultsTo: false,
    },
    typeSection: {
      type: 'string',
      required: true,
    },
  },


  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },


  fn: async function ({ name, shortName, withSpecialty, typeSection}) {

    withSpecialty = withSpecialty ? 'si' : 'no';

    let level = await Level.create({name, shortName, withSpecialty, typeSection})
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    return level;
  }


};
