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


  /***************************************************************************
  * Public routes                                                            *
  ***************************************************************************/
  'POST  /login':                             { action: 'entrance/login' },
  'POST /signup':                             { action: 'entrance/signup' },
  'GET /profile':                             { action: 'profile' },

  'POST /students/changePassword':             { action: 'student/change-password' },

  'GET /firstAdmin/':                         { action: 'first-admin/find' },
  'POST /firstAdmin/':                        { action: 'first-admin/create' },

  'POST /password/email':                     { action: 'password/email' },
  'POST /password/reset':                     { action: 'password/reset' },

  'GET /filter/getFilters':                   { action: 'project-filter/filters' },
  'POST /filter/getProjects':                 { action: 'project-filter/projects' },

  /***************************************************************************
  * Admin                                                                    *
  ***************************************************************************/
  // ...

  /***************************************************************************
  * Studnts                                                                    *
  ***************************************************************************/
  // ...

  /***************************************************************************
   * Level                                                                    *
   ***************************************************************************/
  // ...

  /***************************************************************************
   * Section                                                                  *
   ***************************************************************************/
  // ...

  /***************************************************************************
   * Specialty                                                                *
   ***************************************************************************/
  // ...

  /***************************************************************************
   * Reports                                                                 *
   ***************************************************************************/
  // Student
  'GET /myReport/group':                      { action: 'group-report/my-report' },
  'GET /myReport/single':                     { action: 'single-report/my-report' },

  // Create
  'POST /groupReports':                       { action: 'group-report/create' },
  'POST /singleReports':                      { action: 'single-report/create' },
  // Update
  'PATCH /groupReports':                      { action: 'group-report/update' },
  // Delete
  'DELETE /groupReports/:id':                 { action: 'group-report/destroy' },
  'DELETE /singleReports/:id':                { action: 'single-report/destroy' },

  // Add items
  'POST /itemGroupReports':                   { action: 'item-group-report/create' },
  'POST /itemSingleReports':                  { action: 'item-single-report/create' },
  // Destroy items
  'DELETE /itemGroupReports/:id':             { action: 'item-group-report/destroy' },
  'DELETE /itemSingleReports/:id':            { action: 'item-single-report/destroy' },

  // PDF
  'GET /pdf/group':                           { action: 'pdf/group'},
  'GET /pdf/group/:id':                       { action: 'pdf/group'},

  'GET /pdf/single':                          { action: 'pdf/single'},
  'GET /pdf/single/:id':                      { action: 'pdf/single'},

};
