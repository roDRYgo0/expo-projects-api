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

  '*': 'notFound',

  'admin/*': 'isAdmin',

  'level/*': 'isAdmin',

  'section/*': 'isAdmin',

  'specialty/*': 'isAdmin',

  'project/*': 'isAdmin',

  'student/*': 'isAdmin',

  Grade: {
    '*': 'isAdmin',
    find: 'isTeacher',
  },

  'group-report': {
    '*': 'isAdmin',
    create: 'onlyStudent',
    update: 'onlyStudent',
    'my-report': 'onlyStudent',
  },

  'item-group-report': {
    create: 'onlyStudent',
    destroy: 'onlyStudent',
  },

  'single-report': {
    '*': 'isAdmin',
    create: 'onlyStudent',
    'my-report': 'onlyStudent',
  },

  'item-single-report': {
    create: 'onlyStudent',
    destroy: 'onlyStudent',
  },

  Observation: {
    create: 'hasAccess',
    destroy: 'hasAccess',
  },

  'profile': 'isAuthenticated',

  'pdf/*': true,
  'entrance/*': true,
  'password/*': true,
  'project-filter/*': true,
  'first-admin/*': true,

};
