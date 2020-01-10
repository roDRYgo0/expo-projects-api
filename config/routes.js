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

  'POST  /login':                       { action: 'entrance/login' },
  'POST /signup':                       { action: 'entrance/signup' },
  'GET /profile/':                       { action: 'profile' },

  'GET /firstAdmin/':                       { action: 'first-admin/find', cors: false },
  'POST /firstAdmin/':                       { action: 'first-admin/create' },

  'POST /password/email':                       { action: 'password/email' },
  'POST /password/reset':                       { action: 'password/reset' },

  'GET /filter/getFilters':                       { action: 'project-filter/filters' },
  'POST /filter/getProjects':                       { action: 'project-filter/projects' },

};
