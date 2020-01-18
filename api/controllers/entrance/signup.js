module.exports = {


  friendlyName: 'Signup',


  description: 'Sign up for a new student account.',


  inputs: {
    carnet: {
      required: true,
      type: 'string',
    },
    password: {
      required: true,
      type: 'string',
      maxLength: 200,
    },
    fullName: {
      required: true,
      type: 'string',
    },
    project: {
      type: 'string',
    }
  },


  exits: {
    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },
  },


  fn: async function ({ fullName, carnet, project, password}) {

    let _project = await Project.findOne({id: project});

    if (!_project) {
      throw 'invalid';
    }

    await Student.create(_.extend({
      fullName,
      carnet,
      email: carnet + sails.config.custom.extensionEmailStudents,
      project,
      password: await sails.helpers.passwords.hashPassword(password),
    }, sails.config.custom.verifyEmailAddresses? {
      emailProofToken: await sails.helpers.strings.random('url-friendly'),
      emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
      emailStatus: 'unconfirmed',
    }:{}))
    .intercept('E_UNIQUE', 'emailAlreadyInUse')
    .intercept({name: 'UsageError'}, 'invalid');

    if (sails.config.custom.verifyEmailAddresses) {
      // Send "confirm account" email
      // await sails.helpers.sendTemplateEmail.with({
      //   to: newEmailAddress,
      //   subject: 'Please confirm your account',
      //   template: 'email-verify-account',
      //   templateData: {
      //     fullName: inputs.fullName,
      //     token: newUserRecord.emailProofToken
      //   }
      // });
    } else {
      sails.log.info('Skipping new account email verification... (since `verifyEmailAddresses` is disabled)');
    }

  }


};
