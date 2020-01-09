/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': 'isAuthenticated',

  'admin/*': 'isAdmin',
  'level/*': 'isAdmin',
  'section/*': 'isAdmin',
  'specialty/*': 'isAdmin',

  GradeController: {
    find: 'isTeacher',
    findOne: 'isTeacher',
    create: 'isAdmin',
    update: 'isAdmin',
    destroy: 'isAdmin',
  },

  'entrance/*': true,
  'project-filter/*': true,
  'first-admin/*': true,

};
