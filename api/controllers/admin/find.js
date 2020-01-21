module.exports = {


  friendlyName: 'Find',


  description: 'Find admin.',


  fn: async function () {

    let users = await Admin.find()
      .sort('createdAt ASC');

    users.map(user => {
      delete user.password;
      delete user.passwordResetToken;
      delete user.passwordResetTokenExpiresAt;
    });

    return {
      admins: users.filter(user => !user.grade)
        .map(user => {
          delete user.grade;
          return user;
        }),
      teachers: await Promise.all(
        users.filter(user => user.grade)
          .map(async user => {
            user.grade = await Grade.findOne(user.grade) || 'notFound';
            return user;
          })
      ),
    };

  }


};
