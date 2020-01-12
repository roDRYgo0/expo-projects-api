const btoa = require('btoa');
const url = require('url');

module.exports = {


  friendlyName: 'Profile',


  description: 'Profile user.',


  fn: async function () {

    let user = null;

    if (this.req.rol === 'student') {
      user = await Student.findOne(this.req.me)
      .populate('project')
      .populate('singleReport');

      if (user.project) {
        user.project.grade = await Grade.findOne(user.project.grade) || null;
        user.groupReport = await GroupReport.findOne({project: user.project.id}).populate('items') || null;
      }

      let qr = btoa(`id:${user.id},project:${user.project ? user.project.id : 'null'}`);
      user.qr =  url.resolve(sails.config.custom.baseUrl,'/set/qr')+'?token='+encodeURIComponent(qr);
    }

    else if (this.req.rol === 'teacher') {
      user = await Admin.findOne(this.req.me);
      user.grade = await Grade.findOne(user.grade);
    }

    else if (this.req.rol === 'admin') {
      user = await Admin.findOne(this.req.me);
    }

    else {
      return res.unauthorized();
    }

    if (user) {
      delete user.password;

      return {
        ...user,
        rol: this.req.rol,
      };
    } else {
      return this.res.unauthorized();
    }


  }


};
