var PdfPrinter = require('pdfmake');
var fs = require('fs');


var fonts = {
  Roboto: {
    normal: 'assets/fonts/Roboto-Regular.ttf',
    bold: 'assets/fonts/Roboto-Medium.ttf',
    italics: 'assets/fonts/Roboto-Italic.ttf',
    bolditalics: 'assets/fonts/Roboto-MediumItalic.ttf'
  }
};
var printer = new PdfPrinter(fonts);

module.exports = {


  friendlyName: 'Create pdf group',

  inputs: {
    id: {
      type: 'string',
      required: true,
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

    notFound: {
      description: 'notFoudn',
    },

  },


  fn: async function ({ id }) {

    let groupReport = null;

    groupReport = await GroupReport.findOne({project: id})
    .populate('project')
    .populate('items');

    if (!groupReport || !groupReport.project.grade) {
      throw 'notFound';
    }

    groupReport.project.grade = await Grade.findOne(groupReport.project.grade);

    // let pdfContent = await sails.helpers.templateGroup.with({data: groupReport});

    // let pdfDoc = printer.createPdfKitDocument(pdfContent, null);
    // pdfDoc.pipe(fs.createWriteStream(`./api/pdf/group/${id}.pdf`));
    // pdfDoc.end();

    return;
  }


};

