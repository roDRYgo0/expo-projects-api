module.exports = {


  friendlyName: 'Find',


  description: 'Find student.',


  fn: async function () {

    let students = await Student.find()
      .populate('project')
      .populate('singleReport');

    await Promise.all(students.map(async student => {
      if (student.project && student.project.grade) {
        student.project.grade = await Grade.findOne(student.project.grade)
          .populate('level')
          .populate('specialty')
          .populate('section');
      }
      delete student.password;
      delete student.passwordResetToken;
      delete student.passwordResetTokenExpiresAt;
      delete student.emailProofToken;
      delete student.emailProofTokenExpiresAt;
      return student;
    }));

    return students;

  }


};
