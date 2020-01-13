var moment = require('moment');

module.exports = {


  friendlyName: 'Template group report',

  inputs: {
    data: {
      type: 'ref',
      required: true,
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({ data }, exits) {

    var rowsProject = [
      [
        {
          border: [true, false, true, true],
          alignment:'center',
          text:'Fecha de ingreso:',
          bold: true
        },
        {
          border: [true, false, true, true],
          alignment:'center',
          text:'Cantidad:',
          bold: true
        },
        {
          border: [true, false, true, true],
          alignment:'center',
          text:'Nombre del material:',
          bold: true
        }
      ]
    ];
    // moment.locale('es');
    data.items.forEach(element => {
      let row = [
        {
          text:moment(element.entrydatetime).format('dddd, D MMMM'),
          alignment:'center',
          fontSize:10
        },
        {
          text:element.quantity,
          alignment:'center'
        },
        element.name];
      rowsProject.push(row);
    });

    exits.success({
      content: [
        {
          table: {
            heights:80,
            widths:['*',95],
            body: [
              [{
                style: 'header',
                alignment: 'center',
                margin: [0, 20],
                border: [true, true, false, true],
                text: `INSTITUTO TÉCNICO RICALDONE\nEXPOTÉCNICA ${moment().year()}`
              },
              {
                border: [false, true, true, true],
                image: 'assets/img/expo.jpg',
                width: 70,
                height: 100,
              }
              ]
            ]
          }
        },
        {
          table:{
            widths:['*',150],
            heights:55,
            body:[
              [
                {
                  margin:[5,20],
                  border: [true, false, true, true],
                  text:[
                    'Nombre del proyecto: ',
                    {text:`${data.project.name}`,bold:true},
                    '\nID: ',
                    {text:`${data.project.projectId}`,bold:true},
                  ],
                },{
                  margin:[0,20],
                  border: [true, false, true, true],
                  text:[
                    'Grado: ',
                    {text:`\n${data.project.grade.name}`,bold:true},
                  ],
                }
              ]
            ]
          }
        },{
          table:{
            widths:['*','*'],
            heights:50,
            body:[
              [
                {
                  border: [true, false, true, true],
                  text:[
                    'Nombre del coordinador del grupo:',
                    {text:`\n${data.coordinatorname}`, bold : true}
                  ]
                },
                {
                  border: [true, false, true, true],
                  text:[
                    'Nombre del profesor guía:',
                    {text:`\n${data.guideteacher}`, bold : true}
                  ]
                }
              ]
            ]
          }
        },{
          table:{
            widths:'*',
            heights: 45,
            body:[
              [
                {
                  margin:[5, 0],
                  border: [true, false, true, true],
                  text:[
                    {text:'Justificación de ingreso de material o producto alimenticio:', bold: true},
                    `\n${data.justification}`
                  ]
                }
              ]
            ]
          }
        },{
          table:{
            widths:'*',
            heights:20,
            body:[
              [
                {
                  margin: [0,5],
                  alignment: 'center',
                  border: [true, false, true, true],
                  text:'PRODUCTOS AUTORIZADOS PARA EL INGRESO',
                  bold:true,
                  color: 'white',
                  fillColor: '#000'
                }
              ]
            ]
          }
        },{
          table:{
            widths:'*',
            heights:20,
            body:[
              [
                {
                  margin: [0,5],
                  alignment: 'center',
                  border: [true, false, true, true],
                  text:'Control de ingreso durante el evento',
                  fillColor: '#e5e5e5'
                }
              ]
            ]
          }
        },{
          table:{
            widths:[120,85,'*'],
            heights:20,
            body: rowsProject
          }
        },
        {
          table:{
            heights:50,
            widths: '*',
            body:[
              [
                {
                  alignment:'center',
                  margin:[0,20],
                  border: [true, false, true, true],
                  fontSize: 14,
                  text: data.verified === 'no' ? 'Sin verificar' : 'Verificado',
                  bold:true
                }
              ]
            ]
          }
        }

      ],styles: {
        header: {
          fontSize: 15,
          bold: true
        }
      }
    });
  }


};

