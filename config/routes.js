/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  // 'GET /api/level': { action: 'level/fetch' },

  'POST  /login':                             { action: 'entrance/login' },
  'POST /signup':                             { action: 'entrance/signup' },
  'GET /profile':                             { action: 'profile' },

  'POST /student/changePassword':             { action: 'student/change-password' },

  'GET /firstAdmin/':                         { action: 'first-admin/find' },
  'POST /firstAdmin/':                        { action: 'first-admin/create' },

  'POST /password/email':                     { action: 'password/email' },
  'POST /password/reset':                     { action: 'password/reset' },

  'GET /filter/getFilters':                   { action: 'project-filter/filters' },
  'POST /filter/getProjects':                 { action: 'project-filter/projects' },

  'POST /groupReport':                        { action: 'group-report/create' },
  'GET /myReport/group':                      { action: 'group-report/my-report' },

  'POST /singleReport':                       { action: 'single-report/create' },
  'GET /myReport/single':                     { action: 'single-report/my-report' },

  'POST /itemGroupReport':                    { action: 'item-group-report/create' },
  'PATCH /itemGroupReport':                   { response: 'notFound' },
  'PUT /itemGroupReport':                     { response: 'notFound' },
  'GET /itemGroupReport':                     { response: 'notFound' },
  'GET /itemGroupReport/:id':                 { response: 'notFound' },

  'POST /itemSingleReport':                   { action: 'item-single-report/create' },
  'PATCH /itemSingleReport':                  { response: 'notFound' },
  'PUT /itemSingleReport':                    { response: 'notFound' },
  'GET /itemSingleReport':                    { response: 'notFound' },
  'GET /itemSingleReport/:id':                { response: 'notFound' },

  'GET /pdf/group':                           { action: 'pdf/group'},
  'GET /pdf/group/:id':                       { action: 'pdf/group'},

  'GET /pdf/single':                          { action: 'pdf/single'},
  'GET /pdf/single/:id':                      { action: 'pdf/single'},

};
