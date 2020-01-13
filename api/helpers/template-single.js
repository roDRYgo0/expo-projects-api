var moment = require('moment');

module.exports = {


  friendlyName: 'Template single',

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
    var rowsMaterial = [
      [
        {
          alignment:'center',
          text:'ITEM'
        },{
          alignment:'center',
          text:'CANTIDAD'
        },{
          alignment:'center',
          text:'DESCRIPCIÓN',
          colSpan:3
        },{},{}
      ]
    ];

    data.singleReport.items.forEach((element, index) => {
      let row = [
        {
          alignment:'center',
          fillColor:'#D6D6D6',
          text:`${index+1}`
        },{
          alignment:'center',
          text:element.quantity
        },{
          text: element.name,
          colSpan:3
        },{},{}
      ];
      rowsMaterial.push(row);
    });
    exits.success({
      content: [
        {
          table: {
            heights:80,
            widths:[90,'*', 90],
            body: [
              [
                {
                  border: [false],
                  margin:[0,20],
                  image: 'assets/img/ricaldone.png',
                  width: 70,
                  height: 70,
                },
                {
                  border: [false],
                  alignment:'center',
                  bold:true,
                  margin:[0,33],
                  text: [
                    'INSTITUTO TÉCNICO RICALDONE',
                    `\nFICHA DE INGRESO - EXPOTÉCNICA ${moment().year()}`
                  ]

                },
                {
                  border: [false],
                  image: 'assets/img/expo.jpg',
                  width: 70,
                  height: 100,

                }
              ]
            ]
          }
        },{
          text:'\n'
        },
        {
          table:{
            heights:[40],
            widths:[20,'*',20],
            body:[
              [
                {
                  border:[false],
                  text:''
                },
                {
                  fontSize: 11,
                  margin:[3,5],
                  border:[],
                  fillColor:'#D6D6D6',
                  text:[
                    'La presente ficha es de carácter ',
                    {text:'personal', bold:true},
                    ', por lo que el propietario',
                    ' de los objetos/equipos/mobiliario, es la persona responsable de registrar',
                    ' el ingreso y salida de los mismos.'
                  ]		                },
                {
                  border:[false],
                  text:''
                }
              ]
            ]
          }
        },{
          text:'\n'
        },{
          table:{
            widths:[70,90,80,70,'*'],
            body:[
              [
                {
                  fontSize:10,
                  fillColor:'#D6D6D6',
                  text:'Estudiante:'
                },{
                  colSpan:4,
                  bold:true,
                  text: data.fullName
                },{},{},{}
              ],
              [
                {
                  fontSize:10,
                  fillColor:'#D6D6D6',
                  text:'Proyecto:'
                },{
                  colSpan:4,
                  bold:true,
                  text: data.project.name
                },{},{},{}
              ],
              [
                {
                  fontSize:10,
                  fillColor:'#D6D6D6',
                  text:'Curso:'
                },{
                  colSpan:2,
                  bold:true,
                  text: data.project.grade.name
                },{},{
                  fontSize:10,
                  fillColor:'#D6D6D6',
                  text:'Código:'
                },{
                  bold:true,
                  text: data.carnet
                }
              ],
            ]
          }
        },{
          text:'\n'
        },{
          table:{
            widths:[70,60,80,70,'*'],
            body: rowsMaterial
          }
        },{
          text:'\n'
        },{
          table:{
            widths:[70,'*'],
            body:[
              [
                {
                  fontSize:10,
                  alignment:'center',
                  text:'Observaciones'
                },{
                  bold:true,
                  text: data.singleReport.observation
                }
              ]
            ]
          }
        },{
          alignment:'center',
          fontSize: 10,
          text:'\nLa revisión al ingreso y salida de exposición, es realizada por el profesor guía.\n'
        },{text:'\n'},{
          table:{
            widths:[30,'*',30],
            body:[
              [
                {
                  border:[false],
                  text:' '
                },
                {
                  border:[false],
                  table:{
                    widths:[110, '*'],
                    body:[
                      [
                        {
                          fontSize:10,
                          fillColor:'#D6D6D6',
                          text:'INGRESO REVISADOR POR'
                        },{
                          margin:[5,6],
                          text: data.singleReport.entryname || ''
                        }
                      ],
                      [
                        {
                          fontSize:10,
                          fillColor:'#D6D6D6',
                          text:'FECHA'
                        },{
                          margin:[5,2],
                          text: data.singleReport.entrydatetime || ''
                        }
                      ]
                    ]
                  }
                },
                {
                  border:[false],
                  text:' '
                }
              ]
            ]
          }
        },{text:'\n'},{
          table:{
            widths:[30,'*',30],
            body:[
              [
                {
                  border:[false],
                  text:' '
                },
                {
                  border:[false],
                  table:{
                    widths:[110, '*'],
                    body:[
                      [
                        {
                          fontSize:10,
                          fillColor:'#D6D6D6',
                          text:'SALIDA REVISADOR POR'
                        },{
                          margin:[5,6],
                          text: data.singleReport.departurename || ''
                        }
                      ],
                      [
                        {
                          fontSize:10,
                          fillColor:'#D6D6D6',
                          text:'FECHA'
                        },{
                          margin:[5,2],
                          text: data.singleReport.departuredatetime || ''
                        }
                      ]
                    ]
                  }
                },
                {
                  border:[false],
                  text:' '
                }
              ]
            ]
          }
        },{text:'\n\n'},{
          table: {
            heights:80,
            widths:[90,'*', 90],
            body: [
              [
                {
                  border: [false],
                  image: 'assets/img/footer2.png',
                  width: 90,
                  height: 90,
                },
                {
                  border: [false],
                  alignment:'center',
                  margin:[0,33],
                  color:'gray',
                  fontSize:10,
                  text: [
                    'Nota: El ingreso de equipo y herramientas, se encuentra normado en el procedimiento para entrada y salida de equipo, de',
                    ' la normativa técnica, Guía Educativa 2019 página 120'

                  ]

                },
                {
                  border: [false],
                  image: 'assets/img/footer1.png',
                  width: 90,
                  height: 90,

                }
              ]
            ]
          }
        }
      ]

    });
  }


};

