module.exports = async function (req, res, next) {

  await sails.helpers.verifyJwt.with({
    req: req,
    res: res
  })
    .switch({
      error: (err) => {
        return res.serverError(err);
      },
      invalid: () => {
        return res.sendStatus(401);
      },
      success: (user) => {
        if (user.rol === 'student') {
          return next();
        } else {
          return res.sendStatus(401);
        }
      }
    });
};
