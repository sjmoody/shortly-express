const parseCookies = (req, res, next) => {

  let cookiesObj = {};
  if (typeof req.headers.cookie === 'string') {
    let cookies = req.headers.cookie.split('; ')
      .map(v => v.split('='));
    cookiesObj = Object.fromEntries(cookies);
  }

  req.cookies = cookiesObj;

  return next();

};

module.exports = parseCookies;