module.exports = {


  friendlyName: 'Create',


  description: 'Create project.',


  inputs: {
    name: {
      type: 'string',
      required: true
    },
    projectId: {
      type: 'number',
      required: true,
    },
    state: {
      type: 'string',
      isIn: ['confirmed', 'canceled'],
      defaultsTo: 'confirmed'
    },
    grade: {
      type: 'number',
      required: true,
    },
  },


  exits: {
    projectIdAlreadyInUse: {
      statusCode: 409,
      description: 'The provided projectId is already in use.',
    }
  },


  fn: async function ({ name, projectId, state, grade}) {

    return await Project.create({name, projectId, state, grade})
      .intercept('E_UNIQUE', 'projectIdAlreadyInUse' )
      .fetch();

  }


};
