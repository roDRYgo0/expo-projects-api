module.exports = {


  friendlyName: 'Find',


  description: 'Find grade.',


  fn: async function () {

    let grades = await Grade.find()
      .populate('level')
      .populate('specialty')
      .populate('section');

    return await Promise.all(grades.map(async grade => {
      grade.projects = await Project.find({grade: grade.id})
        .populate('observations');
      return grade;
    }));

  }


};
