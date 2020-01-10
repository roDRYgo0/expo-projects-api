module.exports = {

  datastores: {

    default: {
      adapter: 'sails-postgresql',
      url: process.env.DATABASE_URL,
      ssl: true,

    },

  },

  models: {

    migrate: 'safe',
    // cascadeOnDestroy: false,

  },

  blueprints: {
    actions: false,
    rest: true,
    shortcuts: false,
  },

  security: {

    cors: {
      allRoutes: true,
      allowOrigins: '*',
      allowCredentials: false
    },

  },

  session: {

    // adapter: '@sailshq/connect-redis',
    // url: 'redis://user:password@localhost:6379/databasenumber',

    // cookie: {
    //   secure: true,
    //   maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    // },

  },

  sockets: {

    onlyAllowOrigins: [
      'https://expo-projects.herokuapp.com'
    ],

  },

  log: {
    level: 'debug'
  },

  http: {

    cache: 365.25 * 24 * 60 * 60 * 1000, // One year

    trustProxy: true,

  },

  // port: 80,

  // ssl: undefined,

  email: {
    auth: {
      user: process.env.sails_email__auth__user,
      pass: process.env.sails_email__auth__pass,
    },
    from: process.env.sails_email__from,
    testMode: false,
  },

  custom: {
    // sails_custom__jwtKey
    // verifyEmailAddresses: true,
  },

};
