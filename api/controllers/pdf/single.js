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

module.exports = async function single(req, res) {

  let id = req.params.id;
  let student = null;
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
      id = payload.id;
    }
  } else if (payload.rol === 'student') {
    return res.unauthorized();
  }

  if (isNaN(+id)) {
    return res.badRequest();
  }

  student = await Student.findOne({ id })
  .populate('project');

  if (!student || !student.project) {
    return res.notFound();
  }

  student.project.grade = await Grade.findOne(student.project.grade);

  student.singleReport = await SingleReport.findOne({student: student ? student.id : 0}).populate('items') || null;

  if (!student.singleReport) {
    return res.notFound();
  }

  if (payload.rol !== 'admin') {
    if (payload.rol !== 'student' && payload.controlAccess === 'no' && payload.grade !== student.project.grade) {
      return res.unauthorized();
    }
  }

  let pdfContent = await sails.helpers.templateSingle.with({data: student});

  let pdfDoc = printer.createPdfKitDocument(pdfContent, null);
  pdfDoc.pipe(fs.createWriteStream(path.join(__dirname, '../../pdf/single', `${id}.pdf`)));
  pdfDoc.end();

  await (new Promise(resolve => setTimeout(resolve, 500)));

  return res.sendFile(path.join(__dirname, '../../pdf/single', `${id}.pdf`));

};
