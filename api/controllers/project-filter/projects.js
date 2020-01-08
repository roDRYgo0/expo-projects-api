module.exports = {


  friendlyName: 'Projects',


  description: 'Projects project filter.',


  inputs: {
    level: {
      type: 'string',
    },
    section: {
      type: 'string',
    },
    specialty: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let where = {};
    if (inputs.level) {where.level = inputs.level;}
    if (inputs.specialty) {where.specialty = inputs.specialty;}
    if (inputs.section) {where.section = inputs.section;}

    let grade = await Grade.findOne({...where});

    if (grade) {
      return await Project.find({grade: grade.id})
        .populate('grade');
    } else {
      return [];
    }

  }

};
