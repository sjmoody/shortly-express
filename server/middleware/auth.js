const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (Object.keys(req.cookies).length === 0) {
    // if cookies not set on request
    models.Sessions.create()
      .then(data => {
        models.Sessions.get({id: data.insertId})
          .then(session => {
            let strSession = JSON.stringify(session);
            let sessionObj = JSON.parse(strSession);
            req.session = {
              hash: sessionObj.hash
            };
            res.cookie('shortlyid', sessionObj.hash);
            return next();
          });
      })
      .error(error => {
        console.log(error);
      });
  } else {
    console.log("cookies not zero");
    let hash = req.cookies['shortlyid'];
    models.Sessions.get({hash: hash})
      .then(session => {
        let strSession = JSON.stringify(session);
        let sessionObj = JSON.parse(strSession);
        if (sessionObj.hash) {
          console.log("hash found. will look for user", sessionObj);
          req.session = {
            hash: sessionObj.hash,
            userId: sessionObj.userId,
          };
          models.Users.getFromId(sessionObj.userId)
            .then(user => {
              console.log("user found: ");
              console.log(user);
              return next();
            });

          console.log(req.session);
          console.log(typeof req.session);
          // console.log("returning req.session:", req.session);
          // before I call next I need the req.session to be assigned

        } else {
          // if an incoming cookie is not valid, decide what to do with that session and cookie
          console.log("invalid cookie. TODO: clear and reassign a new cookie");
        }
      });

    // If an incoming request has a cookie, the middleware should verify that the cookie is valid (ie it is a session that is stored in your database)
    // look up the user data related to this session and assign an object to the session property on the request that contains relevant user information

    return next();
  }

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

