const Token = require('./tokenService');
const Admin = require('../models/adminModel');
const {
  badRequestError,
  unauthorized,
  internalServerError,
} = require('../controllersPromises/controllerPromisesErrors');

/**
 * Checks if the token provided is valid
 * @param {JSON} req The request to the api
 * @param {JSON} res The api response in case the token is not valid
 * @param {JSON} next Let the process continue to the next stage
 * @return {JSON} The api response
 */
function auth(req, res, next) {
  const {token} = req.headers;

  if (!token) {
    return badRequestError('auth');
  };

  Token.decodeToken(token)
      .then((result) => {
        Admin.findOne({tag: result}, (err, admin) => {
          if (err) return internalServerError('decodeToken');
          if (!admin) return unauthorized('decodeToken');
          next();
        });
      })
      .catch((err) => {
        return res.send(err);
      });
};

module.exports = {
  auth,
};