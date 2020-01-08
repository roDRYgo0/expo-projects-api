module.exports = {


  friendlyName: 'Filters',


  description: 'Filters projects.',


  exits: {
    success: {
      description: 'All filters are returned to select projects.',
    },
  },


  fn: async function () {

    return {
      levels: await Level.find(),
      specialties: await Specialty.find(),
      sections: await Section.find(),
    };

  }


};
