const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
/*
TODO: assign session.userId if possible
*/
  Promise.resolve(req.cookies.shortlyid)
    .then((hash) => {
      if (!hash) { // if !exists make a new session
        throw hash;
      }
      return models.Sessions.get({hash});
    })
    .tap(session => {
      // if !exists make a new session
      if (!session) {
        // make a session by throwing!
        throw session;
      }
    })
    .catch(() =>{
      // make a session
      return models.Sessions.create()
        .then(results => {
          return models.Sessions.get({id: results.insertId});
        })
        .tap(session => {
          res.cookie('shortlyid', session.hash);
        });
    })
    .then((session) => {
      req.session = session;
      next();
    });
};


/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.verifySession = (req, res, next) => {
  if (!models.Sessions.isLoggedIn(req.session)) {
    res.redirect('/login');
  } else {
    next();
  }

};