module.exports = {


  friendlyName: 'Find',


  description: 'Find admin.',


  fn: async function () {

    let users = await Admin.find();

    return {
      admins: users.filter(user => !user.grade),
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
