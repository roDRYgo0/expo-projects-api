module.exports = {


  friendlyName: 'Update',


  description: 'Update level.',


  inputs: {
    id: {
      type: 'number',
      required: true,
    },
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

  },


  fn: async function ({ id, name, shortName, withSpecialty, typeSection}) {

    withSpecialty = withSpecialty ? 'si' : 'no';

    let level = await Level.updateOne({id})
    .set({name, shortName, withSpecialty, typeSection})
    .intercept({name: 'UsageError'}, 'invalid');

    return level;

  }


};
