const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // access the parsed cookies on the request, look up the user data related to that session, and assign an object to the session property on the request that contains relevant user information
  // models.Session.get returns promise
  // if there are no cookies on the request, initialize a new session
  if (Object.keys(req.cookies).length === 0) {
    models.Sessions.create()
      .then(data => {
        console.log(data);
      })
      .error(error => {
        console.log(error);
      });
    // initialize a new session
    return next();
  } else {
    // look up the user data related to this session and assign an object to the session property on the request that contains relevant user information
    return next();
  }

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

