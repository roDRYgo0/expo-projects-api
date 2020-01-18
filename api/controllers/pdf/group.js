var PdfPrinter = require('pdfmake');
var path = require('path');
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

module.exports = async function group(req, res) {

  let id = req.params.id;
  let groupReport = null;
  let payload = null;

  let token = req.query.token;

  if (!req.headers.authorization && token) {
    req.headers.authorization = `Bearer ${token}`;
  } else if (!req.headers.authorization && !token) {
    return res.unauthorized();
  }

  payload = await sails.helpers.verifyJwt.with({ req })
    .tolerate('invalid');

  if (!payload) {
    return res.badRequest();
  }

  if (!id) {

    if (payload.rol !== 'student') {
      return res.badRequest();
    } else {
      id = payload.project;
    }
  } else if (payload.rol === 'student') {
    return res.unauthorized();
  }

  if (isNaN(+id)) {
    return res.badRequest();
  }

  groupReport = await GroupReport.findOne({project: id})
    .populate('project')
    .populate('items');

  if (!groupReport || !groupReport.project.grade) {
    return res.notFound();
  }

  if (payload.rol !== 'admin') {
    if (payload.rol !== 'student' && payload.controlAccess === 'no' && payload.grade !== groupReport.project.grade) {
      return res.unauthorized();
    }
  }

  groupReport.project.grade = await Grade.findOne(groupReport.project.grade);

  let pdfContent = await sails.helpers.templateGroup.with({data: groupReport});

  let pdfDoc = printer.createPdfKitDocument(pdfContent, null);
  pdfDoc.pipe(fs.createWriteStream(path.join(__dirname, '../../pdf/group', `${id}.pdf`)));
  pdfDoc.end();

  await (new Promise(resolve => setTimeout(resolve, 500)));

  return res.sendFile(path.join(__dirname, '../../pdf/group', `${id}.pdf`));
};
