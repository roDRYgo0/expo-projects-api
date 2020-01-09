module.exports = {


  friendlyName: 'Find',


  description: 'Find admin.',


  fn: async function () {

    let users = await Admin.find();

    return {
      teachers: await Promise.all(
        users.filter(user => user.grade)
          .map(async user => {
            user.grade = await Grade.findOne(user.grade);
            return user;
          }),
      ),
      admins: users.filter(user => !user.grade),
    };

  }


};
